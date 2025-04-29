// src/api/submitform.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://backend-testing-qgcx.onrender.com', 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// A function to submit form data
export const submitFormData = async (formData) => {
  try {
    const response = await apiClient.post('/submit', formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Unknown error');
  }
};

export default apiClient;
