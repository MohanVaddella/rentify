import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userType: ''
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/users/register', user)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" onChange={handleChange} placeholder="First Name" required />
      <input type="text" name="lastName" onChange={handleChange} placeholder="Last Name" required />
      <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
      <input type="tel" name="phoneNumber" onChange={handleChange} placeholder="Phone Number" required />
      <select name="userType" onChange={handleChange} required>
        <option value="">Select User Type</option>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
