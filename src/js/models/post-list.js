import postApi from '../api/post-api';

/**
 * @class PostListModel
 * Manages the post list data.
 */
export default class PostListModel {
  constructor() {}

   /**
   * Call postApi get all post
   */
  async getPosts() {
    return await postApi.getPostAll();
  }
}
