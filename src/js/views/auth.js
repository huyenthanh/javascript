import { getElementById, getFormValues, setTextContent } from '../utils/common';
import { checkEmail, checkPassword } from '../utils/validity';

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
   * Return isValid, false when invalid and true when valid
   * @param {object} form
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
   * Get data from form login
   * @param {function} handleLogin
   */
  bindLogin(handleLogin) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      // Get values in form
      const formValues = getFormValues(this.form);
      if (!formValues) return;

      // Validation form values
      const isFormValid = this.validateLoginForm(this.form);
      isFormValid && handleLogin(formValues);
    });
  }
}
