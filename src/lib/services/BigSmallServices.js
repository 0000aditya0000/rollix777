import axios from "axios";
import { baseUrl } from "../config/server.js";

export const fetchResults = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/color/results`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const generateResult = async periodNumber => {
  try {
    if (!periodNumber || isNaN(periodNumber)) {
      throw new Error("Invalid period number");
    }

    const response = await axios.post(`${baseUrl}/api/color/generate-result`, {
      periodNumber: Number(periodNumber)
    });

    if (!response.data) {
      throw new Error("No data received from server");
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to generate result"
      );
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw error;
    }
  }
};

export const getBetHistory = async userId => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/color/bet-history`,
      { userId },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkValidBet = async userId => {
  try {
    const response = await axios.post(`${baseUrl}/api/color/checkValidBet`, {
      userId
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const placeBet = async betData => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/color/place-bet`,
      betData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getServerTime = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/color/server-time`);

    if (!response.data) {
      throw new Error("No data received from server");
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to get server time"
      );
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw error;
    }
  }
};
