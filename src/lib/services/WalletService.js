import { baseUrl } from "../config/server";

// Get user's wallet balance
export const getWallet = async userId => {
  try {
    const response = await fetch(`${baseUrl}/api/user/wallet/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching wallet data:", error.message);
    throw error;
  }
};
