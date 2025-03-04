import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationTracker from '../components/Location/LocationTracker';
import PotholeList from '../components/Location/PotholeList';
import PotholeReport from '../components/Location/PotholeReport';

const HomePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [listKey, setListKey] = useState(0); // For forcing list refresh

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]);

  const handleReportSubmitted = () => {
    setListKey(prev => prev + 1); // Force PotholeList to refresh
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1>Pothole Detection System</h1>
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
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <LocationTracker userId={userId} />
          <div style={{ marginTop: '20px' }}>
            <PotholeReport onReportSubmitted={handleReportSubmitted} />
          </div>
        </div>
        <PotholeList key={listKey} />
      </div>
    </div>
  );
};

export default HomePage;