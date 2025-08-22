import axiosInstance from "../utils/axiosInstance";

const getReferrals = async (userId, page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get(`/api/user/referrals/${userId}`, {
      params: { page, limit },
    });

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

const getReferralsSorted = async (userId, sortBy) => {
  try {
    const response = await axiosInstance.get(
      `/api/user/referrals/sort/${userId}`,
      {
        params: { sortBy, page, limit },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching sorted referrals:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const referralService = {
  getReferrals,
  getReferralsByDate,
  getTodaySummary,
  getReferralsSorted,
};

export default referralService;
