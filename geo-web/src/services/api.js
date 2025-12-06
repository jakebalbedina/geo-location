import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';
const GEO_API = 'https://ipinfo.io';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE}/login`, {
        email,
        password
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export const geoService = {
  getGeoLocation: async (ip = '') => {
    try {
      const url = ip ? `${GEO_API}/${ip}/json` : `${GEO_API}/json`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch geolocation' };
    }
  }
};
