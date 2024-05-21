import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdatePropertyForm({ match }) {
  const [property, setProperty] = useState({
    place: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    hospitalsNearby: '',
    collegesNearby: ''
    // Add fields for other property attributes here
  });

  useEffect(() => {
    axios.get(`/api/properties/${match.params.id}`)
      .then(res => setProperty(res.data))
      .catch(err => console.log(err));
  }, [match.params.id]);

  const handleChange = e => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`/api/properties/${match.params.id}`, property)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="place" value={property.place} onChange={handleChange} placeholder="Place" required />
      <input type="text" name="area" value={property.area} onChange={handleChange} placeholder="Area" required />
      <input type="number" name="bedrooms" value={property.bedrooms} onChange={handleChange} placeholder="Number of Bedrooms" required />
      <input type="number" name="bathrooms" value={property.bathrooms} onChange={handleChange} placeholder="Number of Bathrooms" required />
      <input type="text" name="hospitalsNearby" value={property.hospitalsNearby} onChange={handleChange} placeholder="Nearby Hospitals" required />
      <input type="text" name="collegesNearby" value={property.collegesNearby} onChange={handleChange} placeholder="Nearby Colleges" required />
      {/* Add inputs for other property attributes here */}
      <button type="submit">Update Property</button>
    </form>
  );
}

export default UpdatePropertyForm;
