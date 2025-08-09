import axiosInstance from "../utils/axiosInstance";

export const generatePeriodNumber = async (data) => {
  try {
    const response = await axiosInstance.post("/api/trx/period-trx", data);
    return response;
  } catch (error) {
    throw error.response || error.message;
  }
};

export const placeBetTrx = async (data) => {
  try {
    const response = await axiosInstance.post("/api/trx/place-bet-trx", data);
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

export const generateResult = async (timer, periodNumber, data) => {
  try {
    const response = await axiosInstance(
      `/api/trx/latest-result-trx?timer=${timer}&periodNumber=${periodNumber}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const resultHistoryTrx = async (timer) => {
  try {
    const response = await axiosInstance(
      `/api/trx/result-history-trx?timer=${timer}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

export const betHistoryTrx = async (timer, userId) => {
  try {
    const response = await axiosInstance(
      `api/trx/bet-history-trx?timer=${timer}&userId=${userId}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};
