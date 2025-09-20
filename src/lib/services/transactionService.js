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

export const transactionHistory = async (userId, date, type) => {
  try {
    const response = await axiosInstance.get(
      `http://localhost:5000/api/user/transactionsHistory/${userId}?date=${date}&type=${type}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getWithdrawalHistory = async (userId, date, status) => {
  try {
    const response = await axiosInstance.get(
      `http://localhost:5000/api/wallet/withdrawal-history/${userId}?date=${date}&status=${status}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getDepositHistory = async (userId, date, status) => {
  try {
    const response = await axiosInstance.get(
      `http://localhost:5000/api/wallet/deposit-history/${userId}?date=${date}&status=${status}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
