import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const locationService = {
  updateLocation: async (userId, latitude, longitude, speed) => {
    const response = await axios.post(`${API_URL}/location/update`, {
      userId,
      latitude,
      longitude,
      speed
    });
    return response.data;
  },
  getPotholeHistory: async () => {
    const response = await axios.get(`${API_URL}/location/potholes`);
    return response.data;
  },

  getLocation: async (userId) => {
    const response = await axios.get(`${API_URL}/location/${userId}`);
    return response.data;
  }
};

export default locationService;