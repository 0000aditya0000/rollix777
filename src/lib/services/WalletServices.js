import axiosInstance from "../utils/axiosInstance";
import { baseUrl } from "../config/server";

export const fetchUserWallets = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `${baseUrl}/api/user/wallet/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    throw error;
  }
};
