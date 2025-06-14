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
  
  export const getQueryById = async (id) =>{
    try{
      const response  = await axios.get(`${baseUrl}/api/queries/user/${id}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    }catch(error){
      throw error.response?.data || error.message;
    }
  }

  export const getQuerySearch = async (id) =>{
    try{
      const response  = await axios.get(`${baseUrl}/api/queries/${id}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    }catch(error){
      throw error.response?.data || error.message;
    }
  }

