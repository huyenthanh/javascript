import { Api } from '../api/axios-api';
import { URL_API } from '../constants';

/**
 * @class PostModel
 * Manages the post data.
 */
export default class PostModel {
  constructor() {}

  /**
   * Call postApi get all post
   */
  async getPosts() {
    return await Api.getAll(`${URL_API.POST_URL}?_expand=user`);
  }
}
