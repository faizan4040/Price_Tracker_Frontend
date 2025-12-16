import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import API from "@/feature/api/api";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/v1/products", { headers });
      const data = res.data.products || [];
      setProducts(data);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;
  if (!products.length)
    return <p className="text-center mt-10">No products found.</p>;

  // Metrics
  const totalProducts = products.length;
  const scrapeFailures = products.filter((p) => p.status === "failed").length;

  const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const priceChanges24h = products.filter(
    (p) => new Date(p.updatedAt) > last24h
  ).length;

  const lastSyncTime = products
    .map((p) => new Date(p.updatedAt).getTime())
    .sort((a, b) => b - a)[0];

  const lastSync = lastSyncTime
    ? new Date(lastSyncTime).toLocaleString()
    : "N/A";

  // Chart data: last 7 products
  const chartData = products.slice(-7).map((p, idx) => ({
    name: p.title || `Product ${idx + 1}`,
    price: p.currentPrice || 0,
  }));

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* Total Tracked Products */}
      <Card>
        <CardHeader>
          <CardTitle>Total Tracked Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-emerald-500">{totalProducts}</p>
        </CardContent>
      </Card>

      {/* Price Changes (24H) */}
      <Card>
        <CardHeader>
          <CardTitle>Price Changes (24H)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-emerald-500">
            {priceChanges24h}
          </p>
        </CardContent>
      </Card>

      {/* Scrape Failures */}
      <Card>
        <CardHeader>
          <CardTitle>Scrape Failures</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-emerald-500">
            {scrapeFailures}
          </p>
        </CardContent>
      </Card>

      {/* Last Sync Time */}
      <Card>
        <CardHeader>
          <CardTitle>Last Sync Time</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-bold text-emerald-500">{lastSync}</p>
        </CardContent>
      </Card>

      {/* Price Chart */}
      <Card className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Product Price Changes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  stroke="#8884d8"
                  angle={-30}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#8884d8" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#10B981"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
