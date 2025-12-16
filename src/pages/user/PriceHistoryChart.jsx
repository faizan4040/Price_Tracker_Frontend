import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { toChartData, filterLastNDays } from "@/utils/chartHelpers";

const PriceHistoryChart = ({ data, platform = "Amazon" }) => {
  const [range, setRange] = useState("30D");

  // Prepare clean chart data
  const baseData = useMemo(() => toChartData(data), [data]);

  // Apply filter
  const filteredData = useMemo(() => {
    if (range === "30D") return filterLastNDays(baseData, 30);
    if (range === "60D") return filterLastNDays(baseData, 60);
    return baseData; // ALL TIME
  }, [range, baseData]);

  // Add prevPrice (for dot colors)
  const chartData = filteredData.map((item, i) => ({
    ...item,
    platform,
    prevPrice: i > 0 ? filteredData[i - 1].price : item.price,
  }));

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const isDrop = item.price < item.prevPrice;

      return (
        <div className="p-3 bg-white shadow-md border rounded-lg text-sm">
          <p className="font-semibold text-gray-800">{item.fullDate}</p>
          <p className="mt-1 text-gray-700">
            {item.platform}:{" "}
            <span
              style={{ color: isDrop ? "#10B981" : "#EF4444", fontWeight: "bold" }}
            >
              ₹{item.price}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl">
        <div className="bg-white shadow rounded-lg p-5">

          {/* Tabs */}
          <div className="flex gap-4 mb-4">
            {["30D", "60D", "ALL TIME"].map((tab) => (
              <button
                key={tab}
                onClick={() => setRange(tab)}
                className={`px-4 py-2 rounded ${
                  range === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Product Price Changes
          </h2>

          {/* Chart Height */}
          <div className="w-full h-[430px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

                <XAxis
                  dataKey="name"
                  stroke="#8884d8"
                  angle={-20}
                  textAnchor="end"
                  height={50}
                />

                <YAxis stroke="#8884d8" />

                <Tooltip content={<CustomTooltip />} />

                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#2563EB"
                  strokeWidth={3}
                  activeDot={{ r: 7 }}
                  dot={({ payload }) => {
                    const isDrop = payload.price < payload.prevPrice;
                    return (
                      <circle
                        r={5}
                        fill={isDrop ? "#10B981" : "#EF4444"}
                        strokeWidth={2}
                      />
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceHistoryChart;
