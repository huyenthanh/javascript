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
  async getAll(params) {
    return await Api.getAll(`${URL_API.POST_URL}?_expand=user`, params);
  }

  /**
   * Call api get post by id
   * @param {string} id
   */
  async getById(id) {
    const url = `${URL_API.POST_URL}/${id}?_expand=user`;

    return await Api.getById(url);
  }

  /**
   * Call api update post
   * @param {object} data
   */
  async update(data) {
    const url = `${URL_API.POST_URL}/${data.id}`;

    return await Api.update(url, data);
  }

  /**
   * Call api add post
   * @param {object} data
   */
  async add(data) {
    const url = URL_API.POST_URL;

    return await Api.add(url, data);
  }

  /**
   * Call api delete post
   * @param {object} id
   */
  async delete(id) {
    const url = `${URL_API.POST_URL}/${id}`;

    return await Api.remove(url);
  }
}
