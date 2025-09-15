import axiosInstance from "../utils/axiosInstance";

export const getAllGateways = async () => {
  try {
    const response = await axiosInstance.get("/api/admin/gateways");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
