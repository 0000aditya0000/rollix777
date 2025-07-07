import axiosInstance from "../utils/axiosInstance";

export const submitQuery = async (data) => {
  try {
    const response = await axiosInstance.post("/api/queries/submit", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getQueryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/queries/user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getQuerySearch = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/queries/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
