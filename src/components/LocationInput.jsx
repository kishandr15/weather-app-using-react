import React, { useState } from 'react';
import '../App.css';

const LocationInput = ({ onLocationSubmit }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLocationSubmit(location);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  }


  return (
    <form onSubmit={handleSubmit} className="location-input-container">
      <input 
        type="text"
        placeholder="Enter your location"
        value={location}
        onChange={handleLocationChange}
        className="location-input" 
      />
      <button type="submit" className="submit-button">Check</button>
    </form>
  );
};

export default LocationInput;
