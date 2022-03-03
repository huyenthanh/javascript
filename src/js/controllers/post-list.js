import { Storage, Toast } from '../utils';

/**
 * @class PostController
 * Post controller for post
 * Link the user input and the view output for post
 * @param model
 * @param view
 */
export default class PostController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.bindLogout(this.handleLogout);
    this.view.bindDeletePost(this.handleDeletePost);
  }

  /**
   * Method handle delete post
   * @param {id} postId
   */
  handleDeletePost = async (postId) => {
    try {
      // Call delete post by post id
      await this.model.delete(postId);

      // Render post list
      const data = await this.model.getAll();
      this.view.renderPostList(data);
    } catch (error) {
      Toast.error(error);
    }
  };

  /**
   * Method get post list
   * Get posts data from postModel to view
   */
  async getPostList() {
    try {
      const data = await this.model.getAll();
      this.view.renderPostList(data);
    } catch (error) {
      Toast.error(error);
    }
  }

  /**
   * Method logout
   * Clear local storage
   */
  handleLogout() {
    Storage.removeItem();
    location.reload();
  }
}
