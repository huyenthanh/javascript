import { REMOVE_MESSAGE } from '../constants';
import { isUserAuthenticated, getElementById, setTextContent, isOwner, formatDate } from '../utils';

/**
 * @class PostListView
 * Visual representation of the home page.
 */
export default class PostListView {
  constructor() {
    this.ulElement = getElementById('post-list');
    this.postTemplate = getElementById('post-template');
    this.iconsTemplate = getElementById('icons-template');
    this.postResultElement = getElementById('post-result');
    this.logoutElement = document.querySelector('.logout');
  }

  /**
   * Check the authenticated user
   * If user is logged in, the user can create, edit, delete post and comment for post
   */
  static authentication() {
    isUserAuthenticated();
  }

  /**
   * Create post element
   * When user login show icon edit, remove post created by user
   * @param {array} posts
   */
  createPostElement(post) {
    if (!post) return;

    const { title, user, createdDate, type, userId } = post;

    // Clone node post template for li element
    const liElement = this.postTemplate.content.firstElementChild.cloneNode(true);
    if (!liElement) return;

    // Set text content for element
    setTextContent(liElement, '[data-id="title"]', title);
    setTextContent(liElement, '[data-id="name"]', user.userName);
    setTextContent(liElement, '[data-id="date"]', formatDate(createdDate));
    setTextContent(liElement, '[data-id="type"]', type);

    // If have id in local storage user equal userId in post
    if (isOwner(userId)) {
      // Clone node icon template
      const iconElement = this.iconsTemplate.content.cloneNode(true);
      if (!iconElement) return;

      // Append icon for menu icon in post
      this.menuIcon = liElement.querySelector('[data-id="menu"]');
      if (this.menuIcon) {
        this.menuIcon.appendChild(iconElement);
      }
    }

    // Go to post edit when click edit button
    const editButton = liElement.querySelector('[data-id="edit"]');
    if (editButton) {
      editButton.addEventListener('click', (event) => {
        // Prevent event bubbling to parent
        event.stopPropagation();
        window.location.assign(`/pages/add-edit-post.html?id=${post.id}`);
      });
    }

    // Attach events
    // Go to post detail when click on post item
    const divElement = liElement.firstElementChild;
    if (divElement) {
      divElement.addEventListener('click', () => {
        window.location.assign(`/pages/post-detail.html?id=${post.id}`);
      });
    }

    // Add click event for remove button
    const removeButton = liElement.querySelector('[data-id="remove"]');
    if (removeButton) {
      removeButton.addEventListener('click', (event) => {
        // Prevent event bubbling to parent
        event.stopPropagation();

        // Custom event with name post-delete
        const customEvent = new CustomEvent('post-delete', {
          bubbles: true,
          detail: post,
        });
        // Dispatch event bubble up
        removeButton.dispatchEvent(customEvent);
      });
    }

    return liElement;
  }

  /**
   * Add custom events remove post with name post-delete
   * @param {Function} handle
   */
  bindDeletePost(handle) {
    document.addEventListener('post-delete', async (event) => {
      const post = event.detail;
      const message = REMOVE_MESSAGE.POST;

      // Method displays a dialog box with a message
      if (window.confirm(message)) {
        await handle(post.id);
      }
    });
  }

  /**
   * Bind click event for logout
   * @param {Function} handle
   */
  bindLogout(handle) {
    if (this.logoutElement) {
      this.logoutElement.addEventListener('click', () => {
        handle();
      });
    }
  }

  /**
   * Bind input event search
   * @param {Function} handle
   */
  bindSearchInput(handle) {
    const searchInput = getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (event) => {
      handle(event.target.value);
    });
  }

  /**
   * Render post list
   * Use a ul and li to display the posts
   * @param {array} posts
   */
  renderPostList(posts) {
    // Set text content result when post list empty
    if (posts.length === 0) {
      // Clear current list
      this.ulElement.textContent = '';

      return (this.postResultElement.textContent = 'No results');
    }

    // Clear current list
    this.ulElement.textContent = '';
    // Clear text no result
    this.postResultElement.textContent = '';

    // For each post, create a li element and append it to the page
    posts.forEach((post) => {
      const liElement = this.createPostElement(post);
      this.ulElement.appendChild(liElement);
    });
  }
}

PostListView.authentication();
