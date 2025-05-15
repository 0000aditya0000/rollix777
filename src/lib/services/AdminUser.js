import axios from 'axios';
import { baseUrl } from '../config/server';

export const AdminUserService = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/allusers`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add new user
  addUser: async (userData) => {
    try {
      const response = await axios.post(`${baseUrl}/api/admin/user`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const response = await axios.put(`${baseUrl}/api/user/user/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/user/user/${id}`);
      return true;
    } catch (error) {
      throw error;
    }
  }
};
