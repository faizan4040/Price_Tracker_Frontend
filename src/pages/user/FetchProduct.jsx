import React, { useEffect, useState } from "react";
import API from "@/feature/api/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import loot_deal from "@/assets/BrandLogo/loot_deal.gif";
import restart from "@/assets/BrandLogo/restart.gif";

// Helper function for relative time
const timeAgo = (date) => {
  if (!date) return "Just now";
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const FetchProduct = ({ trackUrl, setTrackUrl }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  const limit = 12; // 12 products per page

  // Load products on mount
  useEffect(() => {
    loadProducts(1); // load first page
  }, []);

  // Add product when trackUrl changes
  useEffect(() => {
    if (!trackUrl) return;
    addNewProduct(trackUrl);
  }, [trackUrl]);

  // Function to load products with pagination
  const loadProducts = async (pageNumber) => {
    try {
      setLoading(true);
      setMessage("⏳ Loading products...");
      const res = await API.get(
        `/api/v1/products?page=${pageNumber}&limit=${limit}`,
        { headers }
      );

      const sorted = (res.data.products || []).sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );

      if (pageNumber === 1) {
        setProducts(sorted);
      } else {
        setProducts((prev) => [...prev, ...sorted]);
      }

      setTotal(res.data.total || 0);
      setPage(pageNumber);
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Add a new product
  const addNewProduct = async (url) => {
    try {
      setLoading(true);
      setMessage(<img src={restart} className="rounded-4xl" />);

      const tempId = `temp-${Date.now()}`;
      const tempProduct = {
        _id: tempId,
        url,
        title: "Loading...",
        image: "",
        status: "loading",
        currentPrice: 0,
        originalPrice: 0,
        discountRate: 0,
        updatedAt: new Date(),
      };

      setProducts((prev) => [tempProduct, ...prev]);
      setTrackUrl("");

      const res = await API.post(
        "/api/v1/products/scrape",
        { url },
        { headers }
      );
      const serverId = res.data._id;

      pollUntilComplete(serverId);
      setMessage("⏳ Scraping product...");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add product");
      setLoading(false);
    }
  };

  // Polling until product scraping is complete
  const pollUntilComplete = (id) => {
    const interval = setInterval(async () => {
      try {
        const res = await API.get("/api/v1/products", { headers });
        const updatedProduct = res.data.products.find(
          (p) => String(p._id) === String(id)
        );

        if (updatedProduct && updatedProduct.status !== "loading") {
          clearInterval(interval);
          const sorted = res.data.products.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setProducts(sorted);
          setMessage("✅ Product updated!");
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
      }
    }, 2000);
  };

  return (
    <div id="loot-deals" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto p-6 flex justify-center">
        <h1 className="flex items-center gap-3 rounded-xl p-4 font-mono font-extrabold text-black bg-white shadow-2xl text-xl sm:text-4xl lg:text-xl">
          <img src={loot_deal} className="h-9 w-10 -mr-2" alt="Loot Deals" />{" "}
          Loot Deals
        </h1>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold lg:text-5xl text-xl text-center mb-10">
          Top deals with price history
        </h2>

        <div className="mt-10 flex justify-center px-2">
          <div className="w-full max-w-6xl">
            {message && (
              <p className="mb-4 text-white text-lg text-center">{message}</p>
            )}

            {/* Loading Skeleton */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-gray-300 dark:bg-gray-700 h-64 rounded-xl"
                  />
                ))}
              </div>
            )}

            {/* Product List */}
            {!loading && products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {products.map((p) => (
                  <Card
                    key={p._id}
                    className="overflow-hidden cursor-pointer rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={p.image || "https://via.placeholder.com/300"}
                        alt={p.title}
                        className="w-full h-48 object-contain rounded-t-lg mt-2"
                      />
                    </div>

                    <CardContent className="space-y-3 p-4">
                      <h1 className="hover:underline font-bold text-lg truncate">
                        {p.title || "No title"}
                      </h1>

                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-lg">
                          <span>{p.currency || "₹"}</span>{" "}
                          <span>{p.currentPrice?.toLocaleString() || "—"}</span>
                        </span>

                        {p.originalPrice && (
                          <span className="text-gray-500 line-through text-base">
                            <span>{p.currency || "₹"}</span>{" "}
                            <span>{p.originalPrice?.toLocaleString()}</span>
                          </span>
                        )}

                        {p.discountRate && (
                          <p className="text-green-600 font-medium text-base">
                            {p.discountRate}% off
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Clock size={18} />
                        <span>{timeAgo(p.updatedAt)}</span>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <Button
                          variant="outline"
                          className="flex-1 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => window.open(p.url, "_blank")}
                        >
                          Get Deal
                        </Button>

                        {/* Price History Button */}
                        <Button
                          onClick={() => navigate(`/product/${p._id}`)}
                          className="flex-1 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                        >
                          Price History
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && products.length === 0 && (
              <p className="text-center text-gray-400 mt-10">
                No products tracked yet.
              </p>
            )}

            {/* Explore More */}
            {!loading && products.length < total && (
              <div className="flex justify-center items-center w-full mt-8">
                <Button
                  className="px-8 py-6 text-lg cursor-pointer"
                  onClick={() => loadProducts(page + 1)}
                >
                  Explore More
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchProduct;
