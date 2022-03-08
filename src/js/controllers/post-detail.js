import { SUBMIT_MESSAGE } from '../constants';
import { querySearchParamsById, Storage, Toast } from '../utils';

/**
 * @class PostDetailController
 * Link the user input and the view output for post detail
 */
export default class PostDetailController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.postId = querySearchParamsById();
  }

  /**
   * Method Call handler from post detail view
   */
  callViewHandler() {
    this.view.bindLogout(this.handleLogout);
    this.view.bindAddEditComment(this.handleCommentFormSubmit);
    this.view.bindRemoveComment(this.handleRemoveComment);
  }

  /**
   * Method get values post detail
   */
  async getPostValues() {
    try {
      // With postId call post detail data render to view
      const data = await this.model.getById(this.postId);
      this.view.renderPostDetail(data);

      // Call method get list comment
      this.getCommentList();
    } catch (error) {
      Toast.error(error);
    }
  }

  /**
   * Method get list comment render to view
   */
  async getCommentList() {
    try {
      // With postId call comments data for post
      const data = await this.model.getComments(this.postId);
      this.view.renderComments(data);
    } catch (error) {
      Toast.error(error);
    }
  }

  /**
   * Method handle comment form submit
   * @param {object} formData
   */
  handleCommentFormSubmit = async (formData) => {
    try {
      // Get user data to local storage
      const user = Storage.getItem();

      // Values add comment
      const addFormData = {
        ...formData,
        postId: this.postId,
        userId: user.id,
      };

      // Get values form to model
      if (formData.id) {
        await this.model.updateComment(formData); // If have id in comment form call model update post
      } else {
        await this.model.addComment(addFormData); // If don't have id in comment form call model add post
      }

      // Show success message
      Toast.success(SUBMIT_MESSAGE.COMMENT_SUCCEED);

      // Call method get list comment
      this.getCommentList();
    } catch (error) {
      Toast.error(error);
    }
  };

  /**
   * Method handle delete comment
   * @param {id} commentId
   */
  handleRemoveComment = async (commentId) => {
    try {
      // Call delete comment by id
      await this.model.deleteComment(commentId);
      // Call method get list comment
      this.getCommentList();
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
    window.location.assign('../index.html');
  }
}
