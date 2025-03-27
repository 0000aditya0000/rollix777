import { baseUrl } from "../config/server";

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/user/allusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};

// Delete user
export const deleteUser = async id => {
  try {
    const response = await fetch(`${baseUrl}/api/user/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to delete user. Status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw error;
  }
};

// Add new user
export const addNewUser = async userData => {
  try {
    const response = await fetch(`${baseUrl}/api/admin/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding user:", error.message);
    throw error;
  }
};

// Update user
export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${baseUrl}/api/user/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
};
