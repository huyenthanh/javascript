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
    this.formTemplate = getElementById('form-template');
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

  registerEditCommentEvent(formEditElement) {
    formEditElement.addEventListener('submit', (event) => {
      event.preventDefault();

      // Get values in form comment
      const formValues = getFormValues(formEditElement);
      // Custom event with name add-edit-comment with data includes form Values, formEditElement
      const customEvent = new CustomEvent('edit-comment', {
        bubbles: true,
        detail: {
          formValues,
          formEditElement,
        },
      });
      // Dispatch event bubble up
      formEditElement.dispatchEvent(customEvent);
    });
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
        // Clone add comment template for add comment element
        const formEditElement = this.formTemplate.content.firstElementChild.cloneNode(true);
        // Query selector
        const commentContent = liElement.querySelector('[data-id="content"]');

        // Remove element
        commentContent.textContent = '';
        editButton.remove();
        removeButton.remove();

        // Append form edit comment element in page
        commentContent.appendChild(formEditElement);
        // Set data attributes in form comment element
        formEditElement.dataset.id = comment.id;
        // Set field value in form
        setFieldValue(formEditElement, '[name="content"]', comment.content);

        // Add submit event for edit form
        this.registerEditCommentEvent(formEditElement);
      });
    }

    // Add click event for remove button
    const removeButton = liElement.querySelector('[data-id="remove"]');
    if (removeButton) {
      removeButton.addEventListener('click', (event) => {
        // Prevent event bubbling to parent
        event.stopPropagation();

        // Custom event with name delete-comment
        const customEvent = new CustomEvent('delete-comment', {
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
  bindAddComment(onSubmit) {
    document.addEventListener('add-comment', async (event) => {
      const { formValues, formCreateElement } = event.detail;

      // Validation form values
      const isFormValid = this.validateCommentForm(formCreateElement);
      // If valid trigger submit callback, otherwise show validation errors
      if (isFormValid) {
        await onSubmit(formValues);
      }

      // Reset form
      formCreateElement.reset();
    });
  }

  /**
   * Bind submit event for comment form when add edit comment
   * @param {Function} onSubmit
   */
  bindEditComment(onSubmit) {
    document.addEventListener('edit-comment', async (event) => {
      const { formValues, formEditElement } = event.detail;
      // Create id attribute and set value
      formValues.id = formEditElement.dataset.id;
      console.log(formValues);

      // Validation form values
      const isFormValid = this.validateCommentForm(formEditElement);
      // If valid trigger submit callback, otherwise show validation errors
      if (isFormValid) {
        await onSubmit(formValues);
      }

      // Reset form
      formEditElement.reset();
    });
  }

  /**
   * Bind click event for remove comment
   * @param {Function} handle
   */
  bindRemoveComment(handle) {
    document.addEventListener('delete-comment', async (event) => {
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
    const { title, user, createdDate, content, type } = post;

    // Set text content for elements
    setTextContent(document, '#post-detail-title', title);
    setTextContent(document, '#post-detail-username', user.userName);
    setTextContent(document, '#post-detail-date', formatDate(createdDate));
    setTextContent(document, '#post-detail-content', content);
    setTextContent(document, '#post-detail-type', type);

    // Display form add comment if the user logged
    if (this.userStorage) {
      // Clone add comment template for add comment element
      const formCreateElement = this.formTemplate.content.firstElementChild.cloneNode(true);
      // Append form comment element in page
      this.addCommentElement.appendChild(formCreateElement);

      // Add click event for submit form
      formCreateElement.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get values in form comment
        const formValues = getFormValues(formCreateElement);
        // Custom event with name add-edit-comment with data includes formValues, formCreateElement data
        const customEvent = new CustomEvent('add-comment', {
          bubbles: true,
          detail: {
            formValues,
            formCreateElement,
          },
        });
        // Dispatch event bubble up
        formCreateElement.dispatchEvent(customEvent);
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
