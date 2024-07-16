import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Login Component
 *
 * This component renders a login form for users to enter their email and password.
 * It uses the `react-hook-form` library to handle form state and validation,
 * and the `useAuth` custom hook to manage authentication logic.
 */
const Login = () => {
  const { login } = useAuth(); // Custom hook to manage authentication
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { handleSubmit, register, formState: { errors } } = useForm(); // useForm hook to handle form logic

  /**
   * onSubmit
   *
   * This function is called when the form is submitted. It attempts to log the user in
   * with the provided email and password. If login is successful, the user is redirected
   * to their profile page. If login fails, an error message is displayed.
   *
   * @param {Object} data - The form data containing email and password
   */
  const onSubmit = async (data) => {
    try {
      // Attempt login with email and password
      await login(data.email, data.password);
      // Redirect to profile page on successful login
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      // Display error message to the user
      alert('Login failed. Please check your email and password.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Email input field */}
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          {/* Password input field */}
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
