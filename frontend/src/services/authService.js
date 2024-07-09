import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Auth service for handling authentication.
 */
export const authService = {
  /**
   * Logs in a user.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<Object>} The user data.
   */
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },

  /**
   * Registers a new user.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<Object>} The user data.
   */
  register: async (email, password) => {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  },
};
