import axiosInstance from "../utils/axiosInstance";

export const getAllTransactions = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/api/user/transactions/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
