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
    this.logoutElement  = document.querySelector('.logout');
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

    // if have id in local storage user equal userId in post
    if (this.user && this.user.id === post.userId) {
      // Clone node icon template
      const iconElement = this.iconsTemplate.content.cloneNode(true);
      if (!iconElement) return;

      // append icon for menu icon in post
      this.menuIcon = liElement.querySelector('[data-id="menu"]');
      if (this.menuIcon) {
        this.menuIcon.appendChild(iconElement);
      }
    }

    return liElement;
  }

  /**
   * Add event click for logout
   * @param {Function} handle
   */
  bindLogout(handle) {
    if (this.logoutElement ) {
      this.logoutElement .addEventListener('click', () => {
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
