import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/users/login', user)
      .then(res => {
        console.log(res.data);
        // Here you would usually save the user's token to local storage and redirect them to the home page
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <Link to="/register">Register</Link>
    </div>
  );
}

export default Login;
