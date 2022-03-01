import { API } from '../constants/api.js';
import axiosClient from './axios-client.js';

const userApi = {
  /**
   * userApi get all user
   */
  getAll(params) {
    const url = API.USER_URL;

    return axiosClient.get(url, { params });
  },

  /**
   * userApi get user by id
   * @param {id} string
   */
  getUserById(id) {
    const url = `${API.USER_URL}/${id}`;

    return axiosClient.get(url);
  },
};

export default userApi;
