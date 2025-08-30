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

export const transferBonusToWallet = async (userId, amount) => {
  try {
    const response = await axiosInstance.post(`/api/wallet/transfer-bonus`, {
      userId,
      amount,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
