import { Api } from '../api/axios-api';
import { URL_API } from '../constants';

/**
 * @class PostListModel
 * Manages the post list data
 */
export default class PostListModel {
  /**
   * Call api get all post
   */
  async getAll(params) {
    return await Api.getAll(`${URL_API.POST_URL}?_expand=user`, params);
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
