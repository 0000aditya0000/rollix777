import axiosInstance from "../utils/axiosInstance";

const getReferrals = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/user/referrals/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching referrals:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const referralService = {
  getReferrals,
};

export default referralService;
