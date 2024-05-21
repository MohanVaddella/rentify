import React from 'react';
import axios from 'axios';

function PropertyCard({ property, buyer }) {
  const handleInterest = () => {
    axios.post('/api/properties/interest', { buyer, property })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };
  return (
    <div>
      <h2>{property.place}</h2>
      <p>Area: {property.area}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Hospitals Nearby: {property.hospitalsNearby}</p>
      <p>Colleges Nearby: {property.collegesNearby}</p>
      {/* Display other property attributes here */}
      <button onClick={handleInterest}>I'm interested</button>
    </div>
  );
}

function handleInterestClick() {
  const buyerEmail = 'buyer@example.com'; // Replace with the actual buyer's email
  const sellerEmail = 'seller@example.com'; // Replace with the actual seller's email
  const propertyDetails = '...'; // Replace with the actual property details

  axios.post('/api/send-email', {
    to: sellerEmail,
    from: buyerEmail,
    message: `A buyer is interested in your property: ${propertyDetails}`,
  })
  .then(() => console.log('Email sent to seller'))
  .catch(err => console.error(err));

  axios.post('/api/send-email', {
    to: buyerEmail,
    from: sellerEmail,
    message: `You expressed interest in a property: ${propertyDetails}`,
  })
  .then(() => console.log('Email sent to buyer'))
  .catch(err => console.error(err));
}

export default PropertyCard;
