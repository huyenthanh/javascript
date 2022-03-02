import Storage from '../utils/storage';
import { checkLogin, getElementById, setTextContent } from '../utils/common';

/**
 * @class PostListView
 * Visual representation of the home page.
 */
export default class PostListView {
  constructor() {
    this.ulElement = getElementById('post-list');
    this.postTemplate = getElementById('post-template');
    this.iconsTemplate = getElementById('icons-template');
    this.user = Storage.getItem();
    checkLogin();
  }

  /**
   * Create post element
   * When user login show icon edit, remove post created by user
   * @param {array} posts
   */
  createPostElement(post) {
    if (!post) return;

    const { title, user, createdDate, type } = post;

    const liElement = this.postTemplate.content.firstElementChild.cloneNode(true);
    if (!liElement) return;

    setTextContent(liElement, '[data-id="title"]', title);
    setTextContent(liElement, '[data-id="name"]', user.userName);
    setTextContent(liElement, '[data-id="date"]', createdDate);
    setTextContent(liElement, '[data-id="type"]', type);

    if (this.user && this.user.id === post.userId) {
      const iconElement = this.iconsTemplate.content.cloneNode(true);
      if (!iconElement) return;

      this.menuIcon = liElement.querySelector('[data-id="menu"]');
      if (this.menuIcon){
        this.menuIcon.appendChild(iconElement);
      }
    }

    return liElement;
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
