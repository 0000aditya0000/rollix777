import { baseUrl } from "../config/server";

const request = async (endpoint, data) => {
  try {
    console.log("Making request to:", `${baseUrl}${endpoint}`);
    console.log("Request data:", data);

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });

    console.log("Response status:", response.status);
    const responseData = await response.json();
    console.log("Response data:", responseData);

    return responseData;
  } catch (error) {
    console.error("Auth Request Error:", error);
    if (error.message === "Failed to fetch") {
      throw new Error("Network error. Please check if the server is running.");
    }
    throw error;
  }
};

export const signin = async data => request("/api/user/login", data);
export const register = async data => request("/api/user/register", data);
