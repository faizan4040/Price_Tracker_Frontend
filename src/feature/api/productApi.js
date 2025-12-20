// import API from "@/feature/api/api"; // your axios instance

import { fetchBaseQuery } from "@reduxjs/toolkit/query";

// export const getProductById = async (id) => {
//   const res = await API.get(`/api/products/product/${id}`); // ✅ match backend
//   return res.data;
// };

const PRODUCT_API = "https://price-tracker-backend-1.onrender.com/api/v1/product";

export const ProductApi = createApi({
  reducerPath:"ProductApi",
  baseQuery:fetchBaseQuery({
    baseUrl:PRODUCT_API,
    credentials:"include"
  })
})