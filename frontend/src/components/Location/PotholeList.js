import React, { useState, useEffect } from 'react';
import locationService from '../../services/locationService';

const PotholeList = () => {
  const [potholes, setPotholes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPotholes();
  }, []);

  const loadPotholes = async () => {
    try {
      setLoading(true);
      const data = await locationService.getPotholeHistory();
      setPotholes(data);
    } catch (err) {
      setError('Failed to load pothole history');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Detected Potholes</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ marginTop: '10px' }}>
          {potholes.length === 0 ? (
            <p>No potholes detected yet</p>
          ) : (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {potholes.map((pothole) => (
                <div
                  key={pothole._id}
                  style={{
                    padding: '10px',
                    margin: '10px 0',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <strong>Location:</strong> {pothole.latitude.toFixed(6)}, {pothole.longitude.toFixed(6)}
                    </div>
                    <div style={{
                      backgroundColor: pothole.severity === 'high' ? '#ff4444' : 
                                     pothole.severity === 'medium' ? '#ffbb33' : '#00C851',
                      padding: '2px 8px',
                      borderRadius: '3px',
                      color: 'white'
                    }}>
                      {pothole.severity}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9em', color: '#666', marginTop: '5px' }}>
                    Detected: {new Date(pothole.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PotholeList;