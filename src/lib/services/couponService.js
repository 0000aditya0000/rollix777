import axiosInstance from "../utils/axiosInstance";

// Create a new coupon
export const createCoupon = async (couponData) => {
  try {
    const response = await axiosInstance.post(
      "/api/coupons/create",
      couponData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Redeem a coupon
export const redeemCoupon = async (userId, code) => {
  try {
    const response = await axiosInstance.post("/api/coupons/redeem", {
      code,
      userId,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all coupons
export const getAllCoupons = async () => {
  try {
    const response = await axiosInstance.get("/api/coupons/all");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get coupon redemption history
export const getCouponHistory = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/coupons/history/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
