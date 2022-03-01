import Storage from '../utils/storage';
import { checkLogin, getElementById } from '../utils/common';

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

     const titleElement = liElement.querySelector('[data-id="title"]');
     if (titleElement) titleElement.textContent = title;

     const userElement = liElement.querySelector('[data-id="name"]');
     if (userElement) userElement.textContent = user.userName;

     const dateElement = liElement.querySelector('[data-id="date"]');
     if (dateElement) dateElement.textContent = createdDate;

     const typeElement = liElement.querySelector('[data-id="type"]');
     if (typeElement) typeElement.textContent = type;

     if (this.user && this.user.id === post.userId) {
       const iconElement = this.iconsTemplate.content.cloneNode(true);
       if (!iconElement) return;

       this.menuIcon = liElement.querySelector('[data-id="menu"]');
       if (this.menuIcon) this.menuIcon.appendChild(iconElement);
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
