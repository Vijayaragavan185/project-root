import React, { useState, useEffect } from 'react';
import locationService from '../../services/locationService';

const LocationTracker = ({ userId }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [acceleration, setAcceleration] = useState(null);
  const [potholeDetected, setPotholeDetected] = useState(false);

  // Function to handle motion detection
  const handleMotion = (event) => {
    const { acceleration } = event;
    setAcceleration({
      x: acceleration.x,
      y: acceleration.y,
      z: acceleration.z
    });

    // Simple pothole detection logic based on vertical acceleration
    if (Math.abs(acceleration.y) > 15) { // threshold for pothole detection
      setPotholeDetected(true);
      // Report pothole
      reportPothole();
    }
  };

  // Function to report pothole
  const reportPothole = async () => {
    if (location) {
      try {
        await locationService.updateLocation({
          userId,
          latitude: location.latitude,
          longitude: location.longitude,
          speed: location.speed,
          isPothole: true,
          severity: determineSeverity(acceleration.y)
        });
      } catch (err) {
        setError('Failed to report pothole');
      }
      // Reset detection after reporting
      setTimeout(() => setPotholeDetected(false), 3000);
    }
  };

  // Determine pothole severity based on acceleration
  const determineSeverity = (acceleration) => {
    const absAcc = Math.abs(acceleration);
    if (absAcc > 25) return 'high';
    if (absAcc > 20) return 'medium';
    return 'low';
  };

  useEffect(() => {
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion);
    } else {
      setError('Device motion not supported on this device');
    }

    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, speed } = position.coords;
          setLocation({ latitude, longitude, speed: speed || 0 });
        },
        (err) => {
          setError('Error getting location: ' + err.message);
        },
        { enableHighAccuracy: true }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
        window.removeEventListener('devicemotion', handleMotion);
      };
    } else {
      setError('Geolocation is not supported by your browser');
    }
  }, [userId]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pothole Detection System</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      {potholeDetected && (
        <div style={{
          backgroundColor: '#ff4444',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '10px'
        }}>
          Pothole Detected!
        </div>
      )}

      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Speed: {location.speed} m/s</p>
        </div>
      )}

      {acceleration && (
        <div>
          <h3>Motion Data:</h3>
          <p>X: {acceleration.x?.toFixed(2)}</p>
          <p>Y: {acceleration.y?.toFixed(2)}</p>
          <p>Z: {acceleration.z?.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default LocationTracker;