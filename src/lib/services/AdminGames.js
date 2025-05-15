import axios from "axios";
import { baseUrl } from "../config/server";

export const FetchAllGames = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/games/allgames`);
      return response.data;
  } catch (error) {
    console.log("Error fetching all games:", error);
    throw error;
  }
};
