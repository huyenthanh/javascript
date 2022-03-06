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
    this.view.bindAddEditComment(this.handleCommentFormSubmit);
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
   * Method handle comment form submit
   * @param {object} formData
   * @param {string} postId
   */
   handleCommentFormSubmit = async (formData, postId) => {
    try {
      // Get user data to local storage
      const user = Storage.getItem();

      // Values add comment
      const addFormData = {
        ...formData,
        postId: postId,
        userId: user.id,
      };

      // Get values form to model
      if (formData.id) {
        await this.model.update(formData); // If have id in comment form call model update post
      } else {
        await this.model.add(addFormData); // If don't have id in comment form call model add post
      }

      // Show success message
      Toast.success('Save comment successfully!');

      // Call method get all comment data by post id
      this.getCommentList(postId);
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
