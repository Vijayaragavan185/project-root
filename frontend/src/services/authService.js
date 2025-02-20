import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password
    });
    return response.data;
  },

  register: async (username, email, password) => {
    const response = await axios.post(`${API_URL}/users/register`, {
      username,
      email,
      password
    });
    return response.data;
  }
};