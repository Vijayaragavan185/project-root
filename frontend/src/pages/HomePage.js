// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationTracker from '../components/Location/LocationTracker';

const HomePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Location Tracking App</h1>
      <button
        onClick={() => {
          localStorage.removeItem('userId');
          navigate('/login');
        }}
        style={{
          padding: '8px 16px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Logout
      </button>
      {userId && <LocationTracker userId={userId} />}
    </div>
  );
}

export default HomePage;