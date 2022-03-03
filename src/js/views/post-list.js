import {
  userAuthenticated,
  getElementById,
  setTextContent,
  Storage,
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
    this.user = Storage.getItem();
  }

  /**
   * Check the authenticated user
   * If user is logged in, the user can create, edit, delete post and comment for post
   */
  static authentication() {
    userAuthenticated();
  }

  /**
   * Create post element
   * When user login show icon edit, remove post created by user
   * @param {array} posts
   */
  createPostElement(post) {
    if (!post) return;

    const { title, user, createdDate, type } = post;

    // Clone node post template for li element
    const liElement =
      this.postTemplate.content.firstElementChild.cloneNode(true);
    if (!liElement) return;

    // set text content for element
    setTextContent(liElement, '[data-id="title"]', title);
    setTextContent(liElement, '[data-id="name"]', user.userName);
    setTextContent(liElement, '[data-id="date"]', createdDate);
    setTextContent(liElement, '[data-id="type"]', type);

    // If have id in local storage user equal userId in post
    if (this.user && this.user.id === post.userId) {
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

    // Add click event for remove button
    const removeButton = liElement.querySelector('[data-id="remove"]');
    if (removeButton) {
      removeButton.addEventListener('click', () => {
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
   * Render post list
   * Use a ul and li to display the posts
   * @param {array} posts
   */
   renderPostList(posts) {
    if (!Array.isArray(posts) || posts.length === 0) return;
    posts.forEach((post) => {
      const liElement = this.createPostElement(post);
      this.ulElement.appendChild(liElement);
    });
  }
}

PostListView.authentication();
