import { baseUrl } from "../config/server";

const request = async (endpoint, data) => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Auth Request Error:", error.message);
    throw error;
  }
};

// Separate GET request function
const getRequest = async (endpoint) => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("GET Request Error:", error.message);
    throw error;
  }
};

export const betHistory = async data => request("/api/color/bet-history", data);

export const getGameTransactions = async (userId) => {
  return getRequest(`/api/user/game-transactions/${userId}`);
};

// Combined function to get history based on game type
export const getBetHistoryByGameType = async (gameType, userId) => {
  if (gameType === 'wingo') {
    return betHistory({ userId: userId });
  } else if (gameType === 'other') {
    return getGameTransactions(userId);
  } else {
    throw new Error("Invalid game type");
  }
};