import axios from "axios";
import { baseUrl } from "../config/server";

export const getWalletBalance = async userId => {
  try {
    const response = await axios.get(`${baseUrl}/api/user/wallet/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    throw error;
  }
};
