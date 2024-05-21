import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function PropertyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    axios.post('/api/properties', data)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('place', { required: true })} placeholder="Place" />
      {errors.place && <p>Place is required</p>}

      <input {...register('area', { required: true })} placeholder="Area" />
      {errors.area && <p>Area is required</p>}

      <input {...register('bedrooms', { required: true, valueAsNumber: true })} placeholder="Number of Bedrooms" />
      {errors.bedrooms && <p>Number of Bedrooms is required</p>}

      <input {...register('bathrooms', { required: true, valueAsNumber: true })} placeholder="Number of Bathrooms" />
      {errors.bathrooms && <p>Number of Bathrooms is required</p>}

      <input {...register('hospitalsNearby', { required: true })} placeholder="Nearby Hospitals" />
      {errors.hospitalsNearby && <p>Nearby Hospitals is required</p>}

      <input {...register('collegesNearby', { required: true })} placeholder="Nearby Colleges" />
      {errors.collegesNearby && <p>Nearby Colleges is required</p>}

      {/* Add inputs for other property attributes here */}
      
      <button type="submit">Post Property</button>
    </form>
  );
}

export default PropertyForm;
