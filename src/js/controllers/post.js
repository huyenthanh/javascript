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

  /**
   * Method handle post form submit
   * @param {object} formData
   */
  handlePostFormSubmit = async (formData) => {
    try {
      const user = Storage.getItem();
      // Values add post
      const addFormData = {
        ...formData,
        createdDate: new Date(),
        userId: user.id,
      };
      // Values add post
      const savedPost = formData.id
        ? await this.model.updatePost(formData)
        : await this.model.addPost(addFormData);
      // show success message
      Toast.success('Save post successfully!');
      // redirect to detail page
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
      // init defaultValues
      let defaultValues = {
        title: '',
        type: '',
        content: '',
      };
      // Query params get id
      const postId = this.view.getSearchParams();
      if (postId) {
        defaultValues = await this.model.getPostById(postId);
      }
      this.view.intPostForm(defaultValues, this.handlePostFormSubmit);
    } catch (error) {
      Toast.error(error);
    }
  }
}
