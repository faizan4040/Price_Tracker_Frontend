import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "@/feature/api/api";
import {
  ArrowBigDown,
  ArrowBigUp,
  Bookmark,
  Heart,
  MessageSquare,
  Share,
  Star,
} from "lucide-react";
import { FaChartLine } from "react-icons/fa";
import PriceInfoCard from "./PriceInFoCard";
import { RiPriceTag3Line } from "react-icons/ri";
import PriceHistoryChart from "./PriceHistoryChart";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const scrapedProduct = location.state?.product || null;

  const [product, setProduct] = useState(scrapedProduct);
  const [loading, setLoading] = useState(!scrapedProduct);
  const [selectedTab, setSelectedTab] = useState("30D");

  // ---------------------------
  // ADMIN FLOW → FETCH FROM DB
  // ---------------------------
  useEffect(() => {
    if (scrapedProduct) return; // user flow — skip DB fetch

    const fetchProduct = async () => {
      try {
        const res = await API.get(`/api/v1/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, scrapedProduct]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (!product)
    return <p className="text-center mt-10 text-lg">Product not found</p>;

  const formatNumber = (num = 0) => {
    return num.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // -----------------------
  // CHART HELPERS
  // -----------------------

  const toChartData = (history = []) => {
    return history.map((item) => ({
      name: new Date(item.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      price: item.price || item.prices,
    }));
  };

  const filterLastNDays = (data, days) => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return data;
  };

  const fullChartData = toChartData(product.priceHistory || []);

  let chartData = fullChartData;

  if (selectedTab === "30D") chartData = filterLastNDays(fullChartData, 30);
  if (selectedTab === "60D") chartData = filterLastNDays(fullChartData, 60);

  const getBuyIndicator = (product) => {
    const { currentPrice, averagePrice } = product || {};

    if (
      typeof currentPrice !== "number" ||
      typeof averagePrice !== "number" ||
      currentPrice <= 0 ||
      averagePrice <= 0
    ) {
      return {
        label: "Unknown",
        color: "gray",
        emoji: "❓",
        reason: "Missing price data",
      };
    }

    const ratio = currentPrice / averagePrice;

    if (ratio <= 0.85)
      return { label: "Excellent", color: "#0a7a24", emoji: "😁" };
    if (ratio <= 0.95) return { label: "Good", color: "#6ccf6f", emoji: "😊" };
    if (ratio <= 1.05)
      return { label: "Average", color: "#e6c339", emoji: "😐" };
    return { label: "Poor", color: "#d9534f", emoji: "😞" };
  };

  const buyIndicator = product ? getBuyIndicator(product) : null;

  return (
    <div>
      <div className="mt-30 flex flex-col md:flex-row gap-6 px-4 max-w-7xl mx-auto">
        {/* Left: Image & Brand */}
        <div className="md:w-1/2 flex flex-col items-center">
          {product.brandImg && (
            <img
              src={product.brandImg}
              alt={product.brand || "Brand"}
              className="w-24 h-24 object-contain mb-4"
            />
          )}
          <img
            src={product.image || "https://via.placeholder.com/400"}
            alt={product.title}
            className="w-full h-auto max-h-96 object-contain rounded-lg shadow"
          />
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                <Star size={16} className="text-yellow-500" />
                <span className="text-sm text-gray-800">
                  {product.stars || 25}
                </span>
              </div>

              <div className="flex items-center gap-1 bg-red-100 px-2 py-1 rounded-full">
                <MessageSquare size={16} />
                <span className="text-sm text-gray-800">
                  {product.reviewsCount || 0} Reviews
                </span>
              </div>
            </div>

            <div className="flex gap-2 ml-auto">
              <span className="flex items-center gap-1 text-sm bg-red-100 px-2 py-1 rounded-full">
                <Heart size={16} className="cursor-pointer" />
                <span>100</span>
              </span>

              <span className="flex items-center gap-2">
                <Bookmark
                  size={24}
                  className="cursor-pointer bg-gray-200 p-1 rounded-full"
                />
                <Share
                  size={24}
                  className="cursor-pointer bg-gray-200 p-1 rounded-full"
                />
              </span>
            </div>
          </div>

          <div className="text-sm text-black opacity-50">
            <span className="text-primary-green font-semibold">
              buyers have recommended this product.
            </span>
          </div>

          <div className="flex items-baseline gap-4">
            <p className="text-2xl md:text-3xl font-semibold text-green-600">
              {product.currency || "₹"}
              {product.currentPrice?.toLocaleString() || "—"}
            </p>

            {product.originalPrice && (
              <p className="line-through text-gray-500">
                {product.currency || "₹"}
                {product.originalPrice?.toLocaleString()}
              </p>
            )}

            {product.discountRate && (
              <p className="text-red-500 font-medium">
                {product.discountRate}% off
              </p>
            )}
          </div>

          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
                icon={<RiPriceTag3Line size={22} className="text-blue-600" />}
                borderColor="#b6dbff"
              />

              <PriceInfoCard
                title="Average Price"
                value={`${product.currency} ${formatNumber(
                  product.averagePrice
                )}`}
                icon={<FaChartLine size={22} className="text-purple-600" />}
                borderColor="#b6dbff"
              />

              <PriceInfoCard
                title="Highest Price"
                value={`${product.currency} ${formatNumber(
                  product.highestPrice
                )}`}
                icon={<ArrowBigUp size={22} className="text-red-600" />}
                borderColor="#b6dbff"
              />

              <PriceInfoCard
                title="Lowest Price"
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
                icon={<ArrowBigDown size={22} className="text-green-600" />}
                borderColor="#b6dbff"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-center"
            >
              Buy Now
            </a>
            <button className="flex-1 border border-gray-400 py-2 rounded hover:bg-gray-100">
              Add Alert
            </button>
          </div>

          <div className="mt-4">
            <p className="font-semibold mb-2">
              Is this a good time to buy this product?
            </p>

            <div className="flex items-center gap-3">
              <span className="text-2xl">{buyIndicator.emoji}</span>
              <span
                className="px-3 py-1 rounded font-semibold text-white"
                style={{ backgroundColor: buyIndicator.color }}
              >
                {buyIndicator.label}
              </span>
            </div>

            {/* Seekbar */}
            <div className="w-full h-3 rounded-full bg-gray-200 mt-3 relative">
              <div
                className="h-3 rounded-full absolute top-0 left-0 transition-all"
                style={{
                  width:
                    buyIndicator.label === "Poor"
                      ? "25%"
                      : buyIndicator.label === "Average"
                      ? "50%"
                      : buyIndicator.label === "Good"
                      ? "75%"
                      : buyIndicator.label === "Excellent"
                      ? "100%"
                      : "0%",
                  backgroundColor: buyIndicator.color,
                }}
              />
            </div>
          </div>

          <p className="mt-4 font-semibold">
            Available Coupons: {product.coupons || 0} Coupons on this Store
          </p>
        </div>
      </div>

      {/* CENTERED CHART */}
      <div className="w-full flex justify-center mt-10">
        <div className="w-full max-w-7xl">
          <PriceHistoryChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

















// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API from "@/feature/api/api";
// import {
//   ArrowBigDown,
//   ArrowBigUp,
//   Bookmark,
//   Heart,
//   MessageSquare,
//   Share,
//   Star,
// } from "lucide-react";
// import { FaChartLine } from "react-icons/fa";
// import PriceInfoCard from "./PriceInFoCard";
// import { RiPriceTag3Line } from "react-icons/ri";
// import PriceHistoryChart from "./PriceHistoryChart";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedTab, setSelectedTab] = useState("30D");

//   useEffect(() => {
//     if (!id) return;

//     const fetchProduct = async () => {
//       try {
//         const res = await API.get(`/api/v1/products/${id}`);
//         setProduct(res.data);
//       } catch (err) {
//         console.error("Error fetching product", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
//   if (!product)
//     return <p className="text-center mt-10 text-lg">Product not found</p>;

//   const formatNumber = (num = 0) => {
//     return num.toLocaleString("en-IN", {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     });
//   };

//   // -----------------------
//   // CHART HELPERS
//   // -----------------------

//   const toChartData = (history = []) => {
//     return history.map((item) => ({
//       name: new Date(item.date).toLocaleDateString("en-IN", {
//         day: "2-digit",
//         month: "short",
//       }),
//       price: item.prices,
//     }));
//   };

//   const filterLastNDays = (data, days) => {
//     const cutoff = new Date();
//     cutoff.setDate(cutoff.getDate() - days);
//     return data;
//   };

//   // Convert history to chart format
//   const fullChartData = toChartData(product.priceHistory || []);

//   let chartData = fullChartData;

//   if (selectedTab === "30D") {
//     chartData = filterLastNDays(fullChartData, 30);
//   } else if (selectedTab === "60D") {
//     chartData = filterLastNDays(fullChartData, 60);
//   }

//   const getBuyIndicator = (product) => {
//     const { currentPrice, averagePrice } = product || {};

//     if (
//       typeof currentPrice !== "number" ||
//       typeof averagePrice !== "number" ||
//       currentPrice <= 0 ||
//       averagePrice <= 0
//     ) {
//       return {
//         label: "Unknown",
//         color: "gray",
//         emoji: "❓",
//         reason: "Missing price data",
//       };
//     }

//     const ratio = currentPrice / averagePrice;

//     if (ratio <= 0.85)
//       return { label: "Excellent", color: "#0a7a24", emoji: "😁" };
//     if (ratio <= 0.95) return { label: "Good", color: "#6ccf6f", emoji: "😊" };
//     if (ratio <= 1.05)
//       return { label: "Average", color: "#e6c339", emoji: "😐" };
//     return { label: "Poor", color: "#d9534f", emoji: "😞" };
//   };

//   const buyIndicator = product ? getBuyIndicator(product) : null;

//   return (
//     <div>
//       <div className="mt-30 flex flex-col md:flex-row gap-6 px-4 max-w-7xl mx-auto">
//         {/* Left: Image & Brand */}
//         <div className="md:w-1/2 flex flex-col items-center">
//           {product.brandImg && (
//             <img
//               src={product.brandImg}
//               alt={product.brand || "Brand"}
//               className="w-24 h-24 object-contain mb-4"
//             />
//           )}
//           <img
//             src={product.image || "https://via.placeholder.com/400"}
//             alt={product.title}
//             className="w-full h-auto max-h-96 object-contain rounded-lg shadow"
//           />
//         </div>

//         {/* Right: Details */}
//         <div className="md:w-1/2 space-y-4">
//           <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>

//           <div className="flex items-center gap-4 flex-wrap">
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
//                 <Star size={16} className="text-yellow-500" />
//                 <span className="text-sm text-gray-800">
//                   {product.stars || 25}
//                 </span>
//               </div>

//               <div className="flex items-center gap-1 bg-red-100 px-2 py-1 rounded-full">
//                 <MessageSquare size={16} />
//                 <span className="text-sm text-gray-800">
//                   {product.reviewsCount || 0} Reviews
//                 </span>
//               </div>
//             </div>

//             <div className="flex gap-2 ml-auto">
//               <span className="flex items-center gap-1 text-sm bg-red-100 px-2 py-1 rounded-full">
//                 <Heart size={16} className="cursor-pointer" />
//                 <span>100</span>
//               </span>

//               <span className="flex items-center gap-2">
//                 <Bookmark
//                   size={24}
//                   className="cursor-pointer bg-gray-200 p-1 rounded-full"
//                 />
//                 <Share
//                   size={24}
//                   className="cursor-pointer bg-gray-200 p-1 rounded-full"
//                 />
//               </span>
//             </div>
//           </div>

//           <div className="text-sm text-black opacity-50">
//             <span className="text-primary-green font-semibold">
//               buyers have recommended this product.
//             </span>
//           </div>

//           <div className="flex items-baseline gap-4">
//             <p className="text-2xl md:text-3xl font-semibold text-green-600">
//               {product.currency || "₹"}
//               {product.currentPrice?.toLocaleString() || "—"}
//             </p>

//             {product.originalPrice && (
//               <p className="line-through text-gray-500">
//                 {product.currency || "₹"}
//                 {product.originalPrice?.toLocaleString()}
//               </p>
//             )}

//             {product.discountRate && (
//               <p className="text-red-500 font-medium">
//                 {product.discountRate}% off
//               </p>
//             )}
//           </div>

//           <div className="my-7 flex flex-col gap-5">
//             <div className="flex gap-5 flex-wrap">
//               <PriceInfoCard
//                 title="Current Price"
//                 value={`${product.currency} ${formatNumber(
//                   product.currentPrice
//                 )}`}
//                 icon={<RiPriceTag3Line size={22} className="text-blue-600" />}
//                 borderColor="#b6dbff"
//               />

//               <PriceInfoCard
//                 title="Average Price"
//                 value={`${product.currency} ${formatNumber(
//                   product.averagePrice
//                 )}`}
//                 icon={<FaChartLine size={22} className="text-purple-600" />}
//                 borderColor="#b6dbff"
//               />

//               <PriceInfoCard
//                 title="Highest Price"
//                 value={`${product.currency} ${formatNumber(
//                   product.highestPrice
//                 )}`}
//                 icon={<ArrowBigUp size={22} className="text-red-600" />}
//                 borderColor="#b6dbff"
//               />

//               <PriceInfoCard
//                 title="Lowest Price"
//                 value={`${product.currency} ${formatNumber(
//                   product.lowestPrice
//                 )}`}
//                 icon={<ArrowBigDown size={22} className="text-green-600" />}
//                 borderColor="#b6dbff"
//               />
//             </div>
//           </div>

//           <div className="flex gap-4">
//             <a
//               href={product.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-center"
//             >
//               Buy Now
//             </a>
//             <button className="flex-1 border border-gray-400 py-2 rounded hover:bg-gray-100">
//               Add Alert
//             </button>
//           </div>

//           <div className="mt-4">
//             <p className="font-semibold mb-2">
//               Is this a good time to buy this product?
//             </p>

//             <div className="flex items-center gap-3">
//               <span className="text-2xl">{buyIndicator.emoji}</span>
//               <span
//                 className="px-3 py-1 rounded font-semibold text-white"
//                 style={{ backgroundColor: buyIndicator.color }}
//               >
//                 {buyIndicator.label}
//               </span>
//             </div>

//             {/* Seekbar */}
//             <div className="w-full h-3 rounded-full bg-gray-200 mt-3 relative">
//               <div
//                 className="h-3 rounded-full absolute top-0 left-0 transition-all"
//                 style={{
//                   width:
//                     buyIndicator.label === "Poor"
//                       ? "25%"
//                       : buyIndicator.label === "Average"
//                       ? "50%"
//                       : buyIndicator.label === "Good"
//                       ? "75%"
//                       : buyIndicator.label === "Excellent"
//                       ? "100%"
//                       : "0%",
//                   backgroundColor: buyIndicator.color,
//                 }}
//               />
//             </div>

//             {/* Optional warning */}
//             {buyIndicator.label === "Unknown" && (
//               <p className="text-sm text-gray-500 mt-1">
//                 ⚠️ Price data is missing — cannot calculate recommendation.
//               </p>
//             )}
//           </div>

//           <p className="mt-4 font-semibold">
//             Available Coupons: {product.coupons || 0} Coupons on this Store
//           </p>
//         </div>
//       </div>

//       {/* CENTERED CHART */}
//       <div className="w-full flex justify-center mt-10">
//         <div className="w-full max-w-7xl">
//           <PriceHistoryChart data={chartData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
