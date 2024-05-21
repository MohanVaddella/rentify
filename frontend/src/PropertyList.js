import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import PropertyCard from './PropertyCard';

function PropertyList() {
  const [properties, setProperties] = useState([
    { id: 1, title: 'Property 1', likes: 0 },
    { id: 2, title: 'Property 2', likes: 0 },
    // More properties...
  ]);


  
  const [likes, setLikes] = useState({});

  useEffect(() => {
    // Fetch properties from your API when component mounts
    axios.get('/api/properties')
      .then(response => {
        setProperties(response.data);
        // Initialize likes for each property
        const initialLikes = {};
        response.data.forEach(property => {
          initialLikes[property.id] = 0;
        });
        setLikes(initialLikes);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      })
  }, []);

  const handleLike = (id) => {
    setProperties(prevProperties => prevProperties.map(property =>
      property.id === id ? { ...property, likes: property.likes + 1 } : property
    ));
  };

  return (
    <div>
      <h1>Available Properties</h1>
      {properties.map(property => (
        <div key={property.id}>
          <h2>{property.title}</h2>
          <p>{property.description}</p>
          {/* Add more property details here */}
          <button onClick={() => handleLike(property.id)}>Like</button>
          <p>{likes[property.id]} likes</p>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
