import { Toast } from '../utils';

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
  }

  /**
   * Method get post list
   * Get posts data from postModel to view
   */
  async getPostList() {
    try {
      const data = await this.model.getPosts();
      this.view.renderPostList(data);
    } catch (error) {
      Toast.error(error);
    }
  }
}
