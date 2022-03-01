import axios from 'axios';
import { API } from '../constants/api';

/**
 * Create a new instance of axios
 */
const axiosClient = axios.create({
  baseURL: API.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Add a response interceptor
 */
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },

  function (error) {
    if (!error.response)
      throw new Error('Network error. Please try again later.');
    throw new Error(error);
  }
);
export default axiosClient;
