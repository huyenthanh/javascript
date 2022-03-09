import { ERROR_MESSAGE, REMOVE_MESSAGE } from '../constants';
import {
  getElementById,
  isOwner,
  setTextContent,
  Storage,
  isUserAuthenticated,
  getFormValues,
  checkRequired,
  setFieldValue,
  formatDate,
} from '../utils';

/**
 * @class PostDetailView
 * Visual representation for post detail.
 */
export default class PostDetailView {
  constructor() {
    this.ulElement = getElementById('comment-list');
    this.commentTemplate = getElementById('comment-template');
    this.formCommentTemplate = getElementById('form-comment-template');
    this.iconsTemplate = getElementById('icons-template');
    this.addCommentElement = getElementById('add-comment');
    this.logoutElement = document.querySelector('.logout');
    this.userStorage = Storage.getItem();
  }

  /**
   * Check the authenticated user
   * If user is logged in, the user can create, edit, delete post and comment for post
   */
  static authentication() {
    isUserAuthenticated();
  }

  /**
   * Create comment element
   * @param {object} comment
   */
  createCommentElement(comment) {
    const { content, userId, user } = comment;

    // Clone node comment template for li element
    const liElement = this.commentTemplate.content.firstElementChild.cloneNode(true);
    if (!liElement) return;

    // Set text content comment for element
    setTextContent(liElement, '[data-id="content"]', content);

    // Set src for avatar user commented
    const avatarUserElement = liElement.querySelector('[data-id="avatar"]');
    avatarUserElement.src = user.avatar;

    // Display edit and delete icon on comment item if the current user is owner comment
    if (isOwner(userId)) {
      // Clone node icon template
      const iconElement = this.iconsTemplate.content.cloneNode(true);
      if (!iconElement) return;

      // Append icon for menu icon in comment item
      this.menuIcon = liElement.querySelector('[data-id="menu"]');
      if (this.menuIcon) {
        this.menuIcon.appendChild(iconElement);
      }
    }

    // Attach events
    // Add click event for edit button
    const editButton = liElement.querySelector('[data-id="edit"]');
    if (editButton) {
      editButton.addEventListener('click', () => {
        const formElement = getElementById('form-comment');
        // Set data attributes in form comment element
        formElement.dataset.id = comment.id;
        // Set field value in form
        setFieldValue(document, '[name="content"]', comment.content);
      });
    }

    // Add click event for remove button
    const removeButton = liElement.querySelector('[data-id="remove"]');
    if (removeButton) {
      removeButton.addEventListener('click', (event) => {
        // Prevent event bubbling to parent
        event.stopPropagation();

        // Custom event with name comment-delete
        const customEvent = new CustomEvent('comment-delete', {
          bubbles: true,
          detail: comment,
        });
        // Dispatch event bubble up
        removeButton.dispatchEvent(customEvent);
      });
    }
    return liElement;
  }

  /**
   * Validate comment form
   * @param {object} form
   * @return {boolean} false when invalid and true when valid
   */
  validateCommentForm(form) {
    // Get errors
    const errors = {
      content: checkRequired(form, '[name="content"]', ERROR_MESSAGE.CONTENT_REQUIRED),
    };

    // Set errors
    for (const key in errors) {
      const element = form.querySelector(`[name="${key}"]`);
      if (element) {
        setTextContent(element.parentElement, '.invalid-feedback', errors[key]);
      }
    }

    const isValid = !errors.content;
    return isValid;
  }

  /**
   * Bind submit event for comment form when add edit comment
   * @param {Function} onSubmit
   */
  bindAddEditComment(onSubmit) {
    document.addEventListener('add-edit-comment', async (event) => {
      const { formValues, formCommentElement } = event.detail;
      // Create id attribute and set value
      formValues.id = formCommentElement.dataset.id;

      // Validation form values
      const isFormValid = this.validateCommentForm(formCommentElement);
      // If valid trigger submit callback, otherwise show validation errors
      if (isFormValid) {
        await onSubmit(formValues);
      }

      // Reset form
      delete formCommentElement.dataset.id;
      formCommentElement.reset();
    });
  }

  /**
   * Bind click event for remove comment
   * @param {Function} handle
   */
  bindRemoveComment(handle) {
    document.addEventListener('comment-delete', async (event) => {
      const comment = event.detail;
      const message = REMOVE_MESSAGE.COMMENT;

      // Method displays a dialog box with a message
      if (window.confirm(message)) {
        await handle(comment.id);
      }
    });
  }

  /**
   * Render list comment for post
   * @param {Array} comments
   */
  renderComments(comments) {
    // Clear current list
    this.ulElement.textContent = '';

    // For each comment, create a comment element and append it to the page
    comments.forEach((comment) => {
      const liElement = this.createCommentElement(comment);
      this.ulElement.appendChild(liElement);
    });
  }

  /**
   * Render post detail
   * @param {object} post
   */
  renderPostDetail(post) {
    const { title, user, createdAt, content, type } = post;

    // Set text content for elements
    setTextContent(document, '#post-detail-title', title);
    setTextContent(document, '#post-detail-username', user.userName);
    setTextContent(document, '#post-detail-date', formatDate(createdAt));
    setTextContent(document, '#post-detail-content', content);
    setTextContent(document, '#post-detail-type', type);

    // Display form add comment if the user logged
    if (this.userStorage) {
      // Clone add comment template for add comment element
      const formCommentElement = this.formCommentTemplate.content.firstElementChild.cloneNode(true);
      // Append form comment element in page
      this.addCommentElement.appendChild(formCommentElement);

      // Add click event for submit form
      formCommentElement.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get values in form comment
        const formValues = getFormValues(formCommentElement);
        // Custom event with name add-edit-comment with data includes formValues, formCommentElement data
        const customEvent = new CustomEvent('add-edit-comment', {
          bubbles: true,
          detail: {
            formValues,
            formCommentElement,
          },
        });
        // Dispatch event bubble up
        formCommentElement.dispatchEvent(customEvent);
      });
    }
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
}

PostDetailView.authentication();
