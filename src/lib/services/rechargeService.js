import axiosInstance from "../utils/axiosInstance";

// Get all recharges
export const getAllRecharges = async () => {
  try {
    const response = await axiosInstance.get("/api/recharge/get-all-recharges");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get recharge details by order ID
export const getRechargeByOrderId = async (orderId) => {
  try {
    const response = await axiosInstance.get(
      `/api/recharge/recharge-detail/${orderId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
