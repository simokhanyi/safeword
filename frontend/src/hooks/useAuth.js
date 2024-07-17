import React, { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';

// Create a context for authentication
const AuthContext = createContext();

/**
 * AuthProvider component
 *
 * This component provides authentication context to its children.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The context provider component.
 */
export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use authentication context.
 *
 * This hook allows components to access authentication state and functions.
 *
 * @returns {Object} The authentication context value.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * useProvideAuth hook
 *
 * This hook provides authentication logic including registration, login, and logout functions.
 *
 * @returns {Object} The authentication functions and state.
 */
const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  /**
   * Registers a new user.
   *
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<void>} The promise to handle registration.
   */
  const register = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/register', { email, password });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Registration error:', error.response.data);
      throw error;
    }
  };

  /**
   * Logs in a user.
   *
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<void>} The promise to handle login.
   */
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error.response.data);
      throw error;
    }
  };

  /**
   * Logs out the current user.
   *
   * This function clears the user state to log out the current user.
   *
   * @returns {Promise<void>} The promise to handle logout.
   */
  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return {
    user,
    isAuthenticated,
    register,
    login,
    logout,
  };
};

export default useAuth;
