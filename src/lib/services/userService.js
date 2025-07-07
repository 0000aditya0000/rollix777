import axiosInstance from "../utils/axiosInstance";

// Fetch user data
const fetchUsers = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/user/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    throw error;
  }
};

// Fetch all user data including wallet, referrals, etc.
const fetchAllUserData = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/api/user/user-all-data/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user all data:", error.message);
    throw error;
  }
};

// Update user data
const updateUser = async (userId, formData) => {
  console.log(formData);
  try {
    const response = await axiosInstance.patch(
      `/api/user/user/${userId}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const userCouponHistory = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/user/coupons/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coupon history:", error.message);
    throw error;
  }
};

export const fetchUserData = async (userId) => fetchUsers(userId);
export const fetchUserAllData = async (userId) => fetchAllUserData(userId);
export const updateUserData = async (userId, formData) =>
  updateUser(userId, formData);
