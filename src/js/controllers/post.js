import { toast } from '../utils/toast';

/**
 * @class PostController
 * Post controller for post
 * @param model
 * @param view
 */
export default class PostController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.getPostList();
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
      toast.error(error);
    }
  }
}
