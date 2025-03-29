import axios from "axios";
import { baseUrl } from "../config/server";

// Get results
export const getResults = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/color/results`);
    return response.data;
  } catch (error) {
    console.error("Error fetching results:", error);
    throw error;
  }
};

// Generate result
export const generateResult = async periodNumber => {
  try {
    const response = await axios.post(`${baseUrl}/api/color/generate-result`, {
      periodNumber
    });
    return response.data;
  } catch (error) {
    console.error("Error generating result:", error);
    throw error;
  }
};

// Check valid bet
export const checkValidBet = async userId => {
  try {
    const response = await axios.post(`${baseUrl}/api/color/checkValidBet`, {
      userId
    });
    return response.data;
  } catch (error) {
    console.error("Error checking valid bet:", error);
    throw error;
  }
};

// Place bet
export const placeBet = async betData => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/color/place-bet`,
      betData
    );
    return response.data;
  } catch (error) {
    console.error("Error placing bet:", error);
    throw error;
  }
};

// Get bet history
export const getBetHistory = async userId => {
  try {
    const response = await axios.post(`${baseUrl}/api/color/bet-history`, {
      userId
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bet history:", error);
    throw error;
  }
};
