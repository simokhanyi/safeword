import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [registrationError, setRegistrationError] = useState('');
  const history = useHistory(); // Initialize useHistory for redirection

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/auth/register', {
        email: data.email,
        password: data.password
      });
      console.log('Registration successful:', response.data);
      // Optionally clear form fields after successful registration
      reset(); // Reset form fields using reset() from useForm
      // Optionally redirect to login page or display a success message
      history.push('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration error:', error.response.data);
      setRegistrationError(error.response.data.msg); // Set registration error message
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            {...register('email', { required: true })}
          />
          {errors.email && <p className="text-danger">Email is required</p>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register('password', { required: true })}
          />
          {errors.password && <p className="text-danger">Password is required</p>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: true,
              validate: value => value === watch('password') || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>} 
        </div>
        {registrationError && <p className="text-danger">{registrationError}</p>} {/* Display registration error message */}
        <button type="submit" className="btn btn-primary btn-block">Register</button>
      </form>
    </div>
  );
};

export default Register;
