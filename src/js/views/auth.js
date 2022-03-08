import { checkEmail, checkPassword, getElementById, getFormValues, setTextContent } from '../utils';

/**
 * @class AuthView
 * Visual representation for user login.
 */
export default class AuthView {
  constructor() {
    this.form = getElementById('login-form');
  }

  /**
   * Validate login form
   * @param {object} form
   * @return {boolean} false when invalid and true when valid
   */
  validateLoginForm(form) {
    // Get errors
    const errors = {
      email: checkEmail(form),
      password: checkPassword(form),
    };

    // Set errors
    for (const key in errors) {
      const element = form.querySelector(`[name="${key}"]`);
      if (element) {
        setTextContent(element.parentElement, '.invalid-feedback', errors[key]);
      }
    }

    const isValid = !errors.email && !errors.password;
    return isValid;
  }

  /**
   * Bind submit event for login
   * @param {function} handleLogin
   */
  bindLogin(handleLogin) {
    this.form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Get values in form
      const formValues = getFormValues(this.form);
      if (!formValues) return;

      // Validation form values
      const isFormValid = this.validateLoginForm(this.form);
      // If valid trigger submit callback, otherwise show validation errors
      if (isFormValid) {
        await handleLogin(formValues);
      }
    });
  }
}
