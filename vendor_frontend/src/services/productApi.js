// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // change to your backend URL
// });

// export default api;


// import axios from "axios";

// // ✅ Only declare api ONCE
// const baseURL = "https://vendor1.onrender.com/api"; // Change to your deployed backend URL if needed

// const api = axios.create({
//   baseURL,
// });

// // ✅ Automatically attach JWT token to every request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("vendor_token") || sessionStorage.getItem("vendor_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;



import axios from "axios";

// ✅ Only declare api ONCE
const baseURL = "http://localhost:5000/api"; // Change to your deployed backend URL if needed
// const baseURL = "https://vendor1.onrender.com/api";
const api = axios.create({
  baseURL,
});

// ✅ Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("vendor_token") || sessionStorage.getItem("vendor_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;