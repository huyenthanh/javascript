import { Api } from '../api/axios-api';
import { URL_API } from '../constants';

/**
 * @class PostModel
 * Manages the post data.
 */
export default class PostModel {
  constructor() {}

  /**
   * Call api get all post
   */
  async getPosts() {
    return await Api.getAll(`${URL_API.POST_URL}?_expand=user`);
  }

  async getPostById(id) {
    const url = `${URL_API.POST_URL}/${id}?_expand=user`;
    return await Api.getById(url);
  }

  /**
   * Call api update post
   * @param {object} data
   */
  async updatePost(data) {
    const url = `${URL_API.POST_URL}/${data.id}`;

    return await Api.update(url, data);
  }

  /**
   * Call api add post
   * @param {object} data
   */
  async addPost(data) {
    const url = URL_API.POST_URL;

    return await Api.add(url, data);
  }
}
