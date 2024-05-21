import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PropertyDetails({ match }) {
  const [property, setProperty] = useState({});

  useEffect(() => {
    axios.get(`/api/properties/${match.params.id}`)
      .then(res => setProperty(res.data))
      .catch(err => console.log(err));
  }, [match.params.id]);

  return (
    <div>
      <h2>{property.place}</h2>
      <p>Area: {property.area}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Hospitals Nearby: {property.hospitalsNearby}</p>
      <p>Colleges Nearby: {property.collegesNearby}</p>
      {/* Display other property attributes here */}
      <button>I'm interested</button>
    </div>
  );
}

export default PropertyDetails;
