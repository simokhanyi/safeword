import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

/**
 * Provides authentication context to the children.
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The context provider component.
 */
export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use authentication context.
 * @returns {Object} The authentication context value.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * Provides authentication logic.
 * @returns {Object} The authentication functions and state.
 */
const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  /**
   * Registers a new user.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<void>} The promise to handle registration.
   */
  const register = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/register', { email, password });
      setUser(response.data);
    } catch (error) {
      console.error('Registration error:', error.response.data);
      throw error;
    }
  };

  /**
   * Logs in a user.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<void>} The promise to handle login.
   */
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      setUser(response.data);
    } catch (error) {
      console.error('Login error:', error.response.data);
      throw error;
    }
  };

  /**
   * Logs out the current user.
   * @returns {Promise<void>} The promise to handle logout.
   */
  const logout = async () => {
    setUser(null);
  };

  return {
    user,
    register,
    login,
    logout,
  };
};
