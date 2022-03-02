import axiosClient from './axios-client';

export const Api = {
  getAll(url, params) {
    return axiosClient.get(url, { params });
  },
  getById(url) {
    return axiosClient.get(url);
  },

  add(url, data) {
    return axiosClient.post(url, data);
  },

  update(url, data) {
    return axiosClient.patch(url, data);
  },

  remove(url) {
    return axiosClient.delete(url);
  },
};
