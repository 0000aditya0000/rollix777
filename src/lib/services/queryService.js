import axios from 'axios';

import { baseUrl } from "../config/server";


export const submitQuery = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/api/queries/submit`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  