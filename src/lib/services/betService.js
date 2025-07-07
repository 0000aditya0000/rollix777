import axiosInstance from "../utils/axiosInstance";

// POST request utility
const request = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(
      "Auth Request Error:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// GET request utility
const getRequest = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(
      "GET Request Error:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// Game-related API calls
export const betHistory = async (data) =>
  request("/api/color/bet-history", data);

export const getGameTransactions = async (userId) => {
  return getRequest(`/api/user/game-transactions/${userId}`);
};

export const getBetHistoryByGameType = async (gameType, userId) => {
  if (gameType === "wingo") {
    return betHistory({ userId });
  } else if (gameType === "other") {
    return getGameTransactions(userId);
  } else {
    throw new Error("Invalid game type");
  }
};
