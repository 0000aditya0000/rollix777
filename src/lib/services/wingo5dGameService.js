import axiosInstance from "../utils/axiosInstance";

// 5D Game API calls using direct axiosInstance methods

export const placeBet5D = async (data) => {
  try {
    const response = await axiosInstance.post("/api/5d/place-bet-5d", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const generateResult5D = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/5d/generate-result-5d",
      data
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPeriod5D = async (data) => {
  try {
    const response = await axiosInstance.post("/api/5d/period-5d", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const betHistory5D = async (data) => {
  try {
    const response = await axiosInstance.post("/api/5d/bet-history-5d", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const resultHistory5D = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/5d/result-history-5d",
      data
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const latestResult5D = async (data) => {
  try {
    const response = await axiosInstance.post("/api/5d/latest-result-5d", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
