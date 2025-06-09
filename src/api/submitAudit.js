import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://firebaseauditor.onrender.com',
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
    if (error.message === 'Network Error') {
      throw new Error('Network error or CORS issue. Check backend CORS settings.');
    }
    throw error.response ? error.response.data : new Error('Unknown error');
  }
};

export default apiClient;
