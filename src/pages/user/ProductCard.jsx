// import { useNavigate } from "react-router-dom";

// export default function ProductCard({ product }) {
//   const navigate = useNavigate();

//   const id = product?._id || product?.id; // always get backend ID

//   const handleClick = () => {
//     if (id) navigate(`/product/${id}`);
//   };

//   // IMAGE fallback
//   const image =
//     product?.image ||
//     product?.thumbnail ||
//     product?.img ||
//     "https://via.placeholder.com/200x200?text=Loading";

//   // PRICE fallback
//   const price =
//     product?.current_price !== undefined && product?.current_price !== null
//       ? product.current_price
//       : product?.price !== undefined && product?.price !== null
//       ? product.price
//       : null;

//   // STATUS fallback
//   const status = product?.status || "loading";

//   return (
//     <div
//       className="card"
//       onClick={handleClick}
//       style={{
//         cursor: id ? "pointer" : "default",
//         border: "1px solid #ddd",
//         borderRadius: "12px",
//         padding: "12px",
//         width: "250px",
//         transition: "transform 0.2s, box-shadow 0.2s",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = "scale(1.03)";
//         e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = "scale(1)";
//         e.currentTarget.style.boxShadow = "none";
//       }}
//     >
//       {/* IMAGE */}
//       <img
//         src={image}
//         alt={product?.title || "Product"}
//         style={{
//           width: "100%",
//           height: "200px",
//           objectFit: "cover",
//           borderRadius: "12px",
//           marginBottom: "10px",
//         }}
//       />

//       {/* TITLE */}
//       <h3
//         style={{
//           fontSize: "1.1rem",
//           marginBottom: "6px",
//           fontWeight: "600",
//           minHeight: "45px",
//         }}
//       >
//         {product?.title || "Loading..."}
//       </h3>

//       {/* PRICE */}
//       <p style={{ marginBottom: "6px" }}>
//         Price:{" "}
//         {price !== null ? (
//           <strong>₹{price}</strong>
//         ) : (
//           <span>Fetching...</span>
//         )}
//       </p>

//       {/* STATUS */}
//       <small>Status: {status}</small>

//       {/* PRODUCT LINK */}
//       {product?.url && (
//         <p style={{ marginTop: "10px" }}>
//           <a
//             href={product.url}
//             target="_blank"
//             rel="noreferrer"
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               color: "#007bff",
//               textDecoration: "underline",
//               fontWeight: "500",
//             }}
//           >
//             Open product link →
//           </a>
//         </p>
//       )}
//     </div>
//   );
// }
