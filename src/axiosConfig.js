import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Set the base URL for your API
const API_URL = 'https://easycart-backend.onrender.com'||'http://localhost:5000' ; // Replace with your actual API URL
axios.defaults.baseURL = API_URL;

// Function to set the token in headers
const setAuthToken = (token) => {
  console.log("token:", token);
  
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Retrieve token from sessionStorage when the app loads
const getTokenFromSessionStorage = () => {
  const token = sessionStorage.getItem('token');
  console.log(token);
  
  if (token) {
    setAuthToken(token); // Set the token if available
  }
};

// Call the token retrieval function on app load/refresh
getTokenFromSessionStorage();

// Axios interceptors
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login if 401 Unauthorized
      window.location.href = '/login'; // Or use navigate from react-router
    }
    return Promise.reject(error);
  }
);

// Expose a function to set the token externally
export const setToken = (token) => {
  if (token) {
    sessionStorage.setItem('token', token); // Store the token in sessionStorage
    setAuthToken(token); // Set the token in headers
  } else {
    sessionStorage.removeItem('token'); // Remove the token if null/undefined
    setAuthToken(null); // Clear the Authorization header
  }
};

export default axios; // Export the configured axios instance
