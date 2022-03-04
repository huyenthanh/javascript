import { querySearchParamsById, Storage, Toast } from '../utils';

/**
 * @class PostDetailController
 * Link the user input and the view output for post detail
 */
export default class PostDetailController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.bindLogout(this.handleLogout);
    this.view.bindAddComment(this.handleAddComment);
  }

  /**
   * Method get values post detail
   */
  async getPostValues() {
    try {
      // Query search params get id
      const postId = querySearchParamsById();

      // With postId call post detail data render to view
      const data = await this.model.getById(postId);
      this.view.renderPostDetail(data);

      // Call method get list comment
      this.getCommentList(postId);
    } catch (error) {
      Toast.error(error);
    }
  }

  /**
   * Method get list comment render to view
   * @param {string} postId
   */
  async getCommentList(postId) {
    try {
      // With postId call comments data for post
      const data = await this.model.getComments(postId);
      this.view.renderComments(data);
    } catch (error) {
      Toast.error(error);
    }
  }

  /**
   * Method get list comment render to view
   * @param {string} postId
   */
  handleAddComment = async (formValues, post) => {
    try {
      const { id, userId } = post;
      // Values add comment
      const addCommentValues = {
        ...formValues,
        postId: id,
        userId: userId,
      };
      // Call model add comment
      await this.model.add(addCommentValues);
      // Call method get all comment data by post id
      this.getCommentList(id);
    } catch (error) {
      Toast.error(error);
    }
  };

  /**
   * Method logout
   * Clear local storage
   */
  handleLogout() {
    Storage.removeItem();
    location.reload();
  }
}
