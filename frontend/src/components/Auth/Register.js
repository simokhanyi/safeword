import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';

/**
 * Register Component
 * 
 * This component renders a registration form for new users to enter their email and password.
 * It uses the `react-hook-form` library to handle form state and validation, 
 * and the `useAuth` custom hook to manage authentication logic.
 */
const Register = () => {
  const { register: registerUser } = useAuth();
  const { handleSubmit, register, formState: { errors } } = useForm();

  /**
   * onSubmit
   * 
   * This function is called when the form is submitted. It attempts to register the user
   * with the provided email and password. If registration fails, an error message is displayed.
   * 
   * @param {Object} data - The form data containing email and password
   */
  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error state or display error message
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </li>
          <li>
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </li>
          <li>
            <button type="submit">Submit</button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Register;
