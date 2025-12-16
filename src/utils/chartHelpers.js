// src/utils/chartHelpers.js

export function toChartData(priceHistory = []) {
  if (!Array.isArray(priceHistory) || priceHistory.length === 0) return [];

  const normalized = priceHistory
    .map((p) => {
      const price = Number(p.prices ?? p.price ?? p.currentPrice ?? NaN);

      // FIX: Safest possible date handling
      let date = null;

      if (p.date) {
        date = new Date(p.date);
      } else if (p.createdAt) {
        date = new Date(p.createdAt);
      } else if (p.updatedAt) {
        date = new Date(p.updatedAt);
      } else {
        date = new Date(); // fallback: today
      }

      // If still invalid
      if (date.toString() === "Invalid Date") {
        date = new Date(); // final fallback
      }

      return { price, date };
    })
    .filter((x) => !isNaN(x.price));

  if (normalized.length === 0) return [];

  // Sort
  normalized.sort((a, b) => a.date - b.date);

  // Group by YYYY-MM-DD
  const map = new Map();
  for (const item of normalized) {
    const key = item.date.toISOString().slice(0, 10);
    map.set(key, item);
  }

  const output = Array.from(map.entries()).map(([dateKey, item]) => {
    const rawDate = new Date(dateKey);

    return {
      name: rawDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      fullDate: rawDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      rawDate,
      price: item.price,
    };
  });

  output.sort((a, b) => a.rawDate - b.rawDate);

  return output;
}

// Filter N days
export function filterLastNDays(chartData = [], n = 30) {
  if (!Array.isArray(chartData) || chartData.length === 0) return [];
  if (n <= 0) return chartData;

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - (n - 1));

  return chartData.filter((item) => item.rawDate >= cutoff);
}
