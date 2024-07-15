import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * ProtectedRoute component
 *
 * This component protects routes from being accessed by unauthenticated users.
 *
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.element - The component to render if authenticated.
 * @param {Object} rest - The rest of the route props.
 * @returns {JSX.Element} The route element.
 */
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth(); // Use the useAuth hook to get authentication status

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
