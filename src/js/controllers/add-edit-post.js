import { querySearchParamsById, Storage, Toast } from '../utils';

/**
 * @class AddEditPostController
 * Add edit post controller for post
 * Link the user input and the view output for add edit post
 * @param model
 * @param view
 */
export default class AddEditPostController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  /**
   * Method Call handler from add edit post view
   */
  callViewHandler() {
    this.view.bindLogout(this.handleLogout);
  }

  /**
   * Method handle post form submit
   * @param {object} formData This is form values
   */
  handlePostFormSubmit = async (formData) => {
    try {
      // Get user data to local storage
      const user = Storage.getItem();

      // Create values add post
      const addFormData = {
        ...formData,
        createdDate: new Date(),
        userId: user.id,
      };

      // Get values form to model
      const savedPost = formData.id
        ? await this.model.update(formData) // If have id in post form call model update post
        : await this.model.add(addFormData); // If don't have id in post form call model add post

      // Show success message
      Toast.success('Save post successfully!');

      // Redirect to detail page
      setTimeout(() => {
        window.location.assign(`/pages/post-detail.html?id=${savedPost.id}`);
      }, 1000);
    } catch (error) {
      Toast.error(error);
    }
  };

  /**
   * Method get default values in add-edit post
   */
  async getDefaultValues() {
    try {
      // Init defaultValues for property in post
      let defaultValues = {
        title: '',
        type: '',
        content: '',
      };

      // Query params get id
      const postId = querySearchParamsById();
      if (postId) {
        defaultValues = await this.model.getById(postId);
      }

      // Pass init defaultValues and callback form submit to view
      this.view.intPostForm(defaultValues, this.handlePostFormSubmit);
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
    window.location.assign('../');
  }
}
