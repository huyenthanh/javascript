import { Api } from '../api/axios-api';
import { URL_API } from '../constants';

/**
 * @class PostDetailModel
 * Manages the post detail data
 */
export default class PostDetailModel {
  /**
   * Call api get post by id
   * @param {string} id
   */
  async getById(id) {
    const url = `${URL_API.POST_URL}/${id}?_expand=user`;

    return await Api.getById(url);
  }

  /**
   * Call api update comment
   * @param {object} data
   */
  async update(data) {
    const url = `${URL_API.COMMENT_URL}/${data.id}`;

    return await Api.update(url, data);
  }

  /**
   * Call api add comment
   * @param {object} data
   */
  async add(data) {
    const url = URL_API.COMMENT_URL;

    return await Api.add(url, data);
  }

  /**
   * Call api delete comment
   * @param {object} id
   */
  async delete(id) {
    const url = `${URL_API.COMMENT_URL}/${id}`;

    return await Api.remove(url);
  }

  /**
   * Call api get all comment by post id
   * @param {string} id
   */
  async getComments(id) {
    const url = `${URL_API.POST_URL}/${id}${URL_API.COMMENT_URL}?_expand=user`;

    return await Api.getById(url);
  }
}
