import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Add your registration logic here
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
        <button type="submit" className="btn btn-primary btn-block">Register</button>
      </form>
    </div>
  );
};

export default Register;
