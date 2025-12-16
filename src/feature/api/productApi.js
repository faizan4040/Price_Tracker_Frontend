// import API from "@/feature/api/api"; // your axios instance

import { fetchBaseQuery } from "@reduxjs/toolkit/query";

// export const getProductById = async (id) => {
//   const res = await API.get(`/api/products/product/${id}`); // ✅ match backend
//   return res.data;
// };

const PRODUCT_API = "https://localhost:8000/api/v1/course";

export const courseApi = createApi({
  reducerPath:"ProductApi",
  baseQuery:fetchBaseQuery({
    baseUrl:PRODUCT_API,
    credentials:"include"
  })
})