import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error state or display error message
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
        />
        {errors.email && <span>Email is required</span>}
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        {errors.password && <span>Password is required</span>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
