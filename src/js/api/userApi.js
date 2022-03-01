import { API } from '../constants/api.js';
import axiosClient from './axiosClient.js';

const userApi = {
  // Function get all user
  getAll(params) {
    const url = API.USER_URL;

    return axiosClient.get(url, { params });
  },

 // Function get user by id
  getUserById(id) {
    const url = `${API.USER_URL}/${id}`;

    return axiosClient.get(url);
  },
};

export default userApi;
