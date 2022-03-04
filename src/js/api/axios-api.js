import axiosClient from './axios-client';

export const Api = {
  /**
   * Get all item
   * @param {string} url
   * @param {object} params
   */
  getAll(url, params) {
    return axiosClient.get(url, { params });
  },

  /**
   * Get item by id
   * @param {string} url
   */
  getById(url) {
    return axiosClient.get(url);
  },

  /**
   * Add item
   * @param {string} url
   * @param {object} data
   */
  add(url, data) {
    return axiosClient.post(url, data);
  },

  /**
   * Update item
   * @param {string} url
   * @param {object} data
   */
  update(url, data) {
    return axiosClient.patch(url, data);
  },

  /**
   * Remove item
   * @param {string} url
   */
  remove(url) {
    return axiosClient.delete(url);
  },
};
