import { Storage, Toast } from '../utils';

/**
 * @class PostController
 * Post controller for post
 * Link the user input and the view output for post
 * @param model
 * @param view
 */
export default class PostListController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  /**
   * Method Call handler from post list view
   */
  callViewHandler() {
    this.view.bindLogout(this.handleLogout);
    this.view.bindDeletePost(this.handleDeletePost);
    this.view.bindSearchInput(this.handSearchInput);
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
   * Method handle search change
   * @param {string} filterName this is name search by title post
   * @param {string} filterValue this is a value search in input
   */
  handleSearchChange = async (filterName, filterValue) => {
    try {
      // Query params
      const url = new URL(window.location);

      // If have filterName set url search params
      if (filterName) {
        url.searchParams.set(filterName, filterValue);
      }

      // Method adds an entry to the browser's session history stack
      history.pushState({}, '', url);

      // Call get all data with search params to view
      const data = await this.model.getAll(url.searchParams);
      this.view.renderPostList(data);
    } catch (error) {
      Toast(error);
    }
  };

  /**
   * Method handle search input
   * @param {string} value this is a value search in input
   */
  handSearchInput = async (value) => {
    this.handleSearchChange('title_like', value);
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
