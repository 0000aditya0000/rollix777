import axiosInstance from "../utils/axiosInstance";

export const fetchResults = async (duration) => {
  try {
    const response = await axiosInstance.post("/api/color/results", {
      duration,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const generateResult = async (periodNumber, duration) => {
  try {
    if (!periodNumber || isNaN(periodNumber)) {
      throw new Error("Invalid period number");
    }

    const response = await axiosInstance.post("/api/color/latest-result", {
      periodNumber: Number(periodNumber),
      duration,
    });

    if (!response.data) {
      throw new Error("No data received from server");
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to generate result"
      );
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw error;
    }
  }
};

export const getBetHistory = async (userId) => {
  try {
    const response = await axiosInstance.post("/api/color/bet-history", {
      userId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkValidBet = async (userId, duration) => {
  try {
    const response = await axiosInstance.post("/api/color/checkValidBet", {
      userId,
      duration,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const placeBet = async (betData) => {
  try {
    const response = await axiosInstance.post("/api/color/place-bet", betData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPeriodNumber = async (duration) => {
  try {
    const response = await axiosInstance.post("/api/color/period", {
      mins: duration,
    });

    return response.data; // Return full data to let component decide what to do
  } catch (error) {
    console.error(`Error fetching period number for ${duration}:`, error);
    throw error;
  }
};

export const getTimerData = async (duration) => {
  try {
    const response = await axiosInstance.post("/api/color/timer", {
      duration,
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching timer data for ${duration}:`, error);
    throw error;
  }
};
