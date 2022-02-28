import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
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
