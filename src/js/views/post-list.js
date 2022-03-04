import dayjs from 'dayjs';
import {
  isUserAuthenticated,
  getElementById,
  setTextContent,
  isOwner,
} from '../utils';

/**
 * @class PostListView
 * Visual representation of the home page.
 */
export default class PostListView {
  constructor() {
    this.ulElement = getElementById('post-list');
    this.postTemplate = getElementById('post-template');
    this.iconsTemplate = getElementById('icons-template');
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
    const liElement =
      this.postTemplate.content.firstElementChild.cloneNode(true);
    if (!liElement) return;

    // Set text content for element
    setTextContent(liElement, '[data-id="title"]', title);
    setTextContent(liElement, '[data-id="name"]', user.userName);
    setTextContent(
      liElement,
      '[data-id="date"]',
      dayjs(createdDate).format('DD/MM/YYYY')
    );
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
        event.stopPropagation();
        window.location.assign(`/pages/add-edit-post.html?id=${post.id}`);
      });
    }

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
      const message = 'Are you sure to remove post ?';

      // Method displays a dialog box with a message
      if (window.confirm(message)) {
        handle(post.id);
      }
    });
  }

  /**
   * Add event click for logout
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
   * Add event search input
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
    // Clear current list
    this.ulElement.textContent = '';

    // For each post, create a li element and append it to the page
    posts.forEach((post) => {
      const liElement = this.createPostElement(post);
      this.ulElement.appendChild(liElement);
    });
  }
}

PostListView.authentication();
