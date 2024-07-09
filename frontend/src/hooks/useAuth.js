import { useState, useContext, createContext } from 'react';

// Create a context for authentication
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
   * Simulates user login.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<void>} The promise to handle login.
   */
  const login = (email, password) => {
    // Replace with actual login logic
    return new Promise((resolve) => {
      setUser({ email });
      resolve();
    });
  };

  /**
   * Simulates user logout.
   * @returns {Promise<void>} The promise to handle logout.
   */
  const logout = () => {
    // Replace with actual logout logic
    return new Promise((resolve) => {
      setUser(null);
      resolve();
    });
  };

  return {
    user,
    login,
    logout,
  };
};
