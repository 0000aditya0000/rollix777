import axiosInstance from "../utils/axiosInstance";

export const getCommissionData = async (userId, date) => {
  try {
    const response = await axiosInstance.get(
      `api/user/commissionSettlement/${userId}?date=${date}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
