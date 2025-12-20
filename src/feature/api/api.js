import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "VITE_API_BASE_URL is missing! Set it in Vercel and redeploy."
  );
}

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // cookies
  headers: { "Content-Type": "application/json" },
});

export default API;








// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
// });

// export default API;
