import axiosInstance from "../utils/axiosInstance";

const request = async (endpoint, data) => {
  try {
    const userId = localStorage.getItem("userId");
    console.log("aasifId", userId);

    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(
      "Request Error:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const updatePassword = async (userId, data) =>
  request(`/api/user/user/password/${userId}`, data);
