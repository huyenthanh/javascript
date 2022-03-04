import { ERROR_MESSAGE } from '../constants';
import {
  getFormValues,
  setFieldValue,
  setTextContent,
  checkRequired,
  getElementById,
  isUserAuthenticated,
  querySearchParamsById,
} from '../utils';

export default class AddEditPostView {
  constructor() {
    this.form = getElementById('post-form');
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
   * Replace text context add edit title
   */
  static setTitleHeader() {
    const titleHeader = getElementById('add-edit-title');
    // Get id search params
    const postId = querySearchParamsById();
    //Set content element
    titleHeader.textContent = postId ? 'Edit a post' : 'Add a post';
  }

  /**
   * Set form values input
   * @param {object} formValues
   */
  setFormValues(formValues) {
    setFieldValue(this.form, '[name="title"]', formValues?.title);
    setFieldValue(this.form, '[name="type"]', formValues?.type);
    setFieldValue(this.form, '[name="content"]', formValues?.content);
  }

  /**
   * Validate login form
   * Return isValid, false when invalid and true when valid
   * @param {object} form
   */
  validatePostForm(form) {
    // Get errors
    const errors = {
      title: checkRequired(form, '[name="title"]', ERROR_MESSAGE.TITLE_REQUIRED),
      type: checkRequired(form, '[name="type"]', ERROR_MESSAGE.TYPE_REQUIRED),
      content: checkRequired(form, '[name="content"]', ERROR_MESSAGE.CONTENT_REQUIRED),
    };

    // Set errors
    for (const key in errors) {
      const element = form.querySelector(`[name="${key}"]`);
      if (element) {
        setTextContent(element.parentElement, '.invalid-feedback', errors[key]);
      }
    }

    const isValid = !errors.title && !errors.type && !errors.content;
    return isValid;
  }

  /**
   * Init post form values
   * @param {object} defaultValues This is default value for property in post
   * @param {function} onSubmit This is a callback function
   */
  intPostForm(defaultValues, onSubmit) {
    this.setFormValues(defaultValues);
    this.form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Get values in form
      const formValues = getFormValues(this.form);
      formValues.id = defaultValues.id;

      // Validation form values
      const isValid = this.validatePostForm(this.form);
      if (isValid) {
        await onSubmit(formValues);
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
}

AddEditPostView.authentication();
AddEditPostView.setTitleHeader();
