// import { baseUrl } from "../config/server";

// const request = async (endpoint, data) => {
//   try {
//     const response = await fetch(`${baseUrl}${endpoint}`, data);

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Request failed");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Auth Request Error:", error.message);
//     throw error;
//   }
// };

// export const signin = async (data) => request("/api/user/login", data);
// export const register = async (data) => request("/api/user/register", data);

import axios from "../utils/axiosInstance";

export const signin = async (data) => {
  const response = await axios.post("/api/user/login", data);
  return response.data;
};

export const register = async (data) => {
  const response = await axios.post("/api/user/register", data);
  return response.data;
};
