// src/components/Location/LocationTracker.js
import React, { useState, useEffect } from 'react';
import locationService from '../../services/locationService';

const LocationTracker = ({ userId }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude, speed } = position.coords;
          try {
            await locationService.updateLocation(
              userId,
              latitude,
              longitude,
              speed || 0
            );
            setLocation({ latitude, longitude, speed });
          } catch (err) {
            setError('Failed to update location');
          }
        },
        (err) => {
          setError('Error getting location: ' + err.message);
        },
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError('Geolocation is not supported by your browser');
    }
  }, [userId]);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Location Tracker</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Speed: {location.speed || 0} m/s</p>
        </div>
      )}
    </div>
  );
};

export default LocationTracker;