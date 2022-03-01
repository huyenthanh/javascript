import postApi from '../api/post-api';

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
    return await postApi.getPostAll();
  }
}
