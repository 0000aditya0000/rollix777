import axiosInstance from "../utils/axiosInstance";

export const getColorReport = async (periodnumber) => {
  try {
    const response = await axiosInstance.get(
      `/api/color/color-bet-report/${periodnumber}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getUserReport = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/api/user/user-bet-stats/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
