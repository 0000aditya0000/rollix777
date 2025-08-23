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

const getTodaySummary = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/api/user/referrals/today-summary/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching today's summary:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getReferralsByDate = async (userId, dateType) => {
  try {
    const response = await axiosInstance.get(
      `/api/user/referralsbydate/${userId}?dateType=${dateType}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching referrals by date:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getReferralSummary = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/api/user/referrals-summary/${userId}`
    );
    return response.data;
  } catch (error) {
    "Error fetching referral summary:", error.response?.data || error.message;
  }
};

export const referralService = {
  getReferrals,
  getReferralsByDate,
  getTodaySummary,
  getReferralSummary,
};

export default referralService;
