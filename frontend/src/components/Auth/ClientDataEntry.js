import React from 'react';
import { useForm } from 'react-hook-form';

const ClientDataEntry = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Handle client data submission logic
    console.log('Client data submitted:', data);
  };

  return (
    <div>
      <h2>Client Data Entry</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Client Name"
          {...register('clientName', { required: true })}
        />
        {errors.clientName && <span>Client Name is required</span>}
        <input
          type="text"
          placeholder="Client Email"
          {...register('clientEmail', { required: true })}
        />
        {errors.clientEmail && <span>Client Email is required</span>}
        <button type="submit">Register Client</button>
      </form>
    </div>
  );
};

export default ClientDataEntry;
