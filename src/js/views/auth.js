/**
 * @class AuthView
 * Visual representation of the model.
 */
import { getElement, getFormValues, setTextContent } from '../utils/common';
import { getEmailError, getPasswordError } from '../utils/validity';

export default class AuthView {
  constructor() {
    this.form = getElement('login-form');
  }

  /**
   * Validate login form
   * Return isValid, false when invalid and true when valid
   * @param {object} form
   */
  validateLoginForm(form) {
    // Get errors
    const errors = {
      email: getEmailError(form),
      password: getPasswordError(form),
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
  getLoginForm(handleLogin) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      // Get values in form
      const formValues = getFormValues(this.form);
      if (!formValues) return;

      // Validation form values
      const isLogin = this.validateLoginForm(this.form);
      isLogin && handleLogin(formValues);
    });
  }
}
