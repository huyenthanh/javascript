import { API } from '../constants/api.js';
import axiosClient from './axios-client.js';

const postApi = {
  /**
   * postApi get all post
   */
  getPostAll(params) {
    const url = `${API.POST_URL}?_expand=user`;
    return axiosClient.get(url, { params });
  },

  /**
   * postApi get post by id
   * @param {id} string
   */
  getPostById(id) {
    const url = `${API.POST_URL}/${id}?_expand=user`;
    return axiosClient.get(url);
  },

  /**
   * postApi add post
   * @param {data} object
   */
  addPost(data) {
    const url = `${API.POST_URL}`;
    return axiosClient.post(url, data);
  },

  /**
   * postApi update post by id
   * @param {data} object
   */
  updatePost(data) {
    const url = `${API.POST_URL}/${data.id}`;
    return axiosClient.patch(url, data);
  },

  /**
   * postApi remove post by id
   * @param {id} string
   */
  removePost(id) {
    const url = `${API.POST_URL}/${id}`;
    return axiosClient.delete(url);
  },
};

export default postApi;
