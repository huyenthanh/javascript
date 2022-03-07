import { LOGIN_MESSAGE } from '../constants';
import { Toast, Storage } from '../utils';

/**
 * @class AuthController
 * Authentication controller for user
 */
export default class AuthController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.bindLogin(this.handleLogin);
  }

  /**
   * Method Call handler from login view
   */
  callViewHandler() {
    this.view.bindLogin(this.handleLogin);
  }

  /**
   * Method handle login
   * Get values from view to login model
   * Save user to local storage and switch to home page when login success
   * @param {data} object the data form values
   */
  handleLogin = async (data) => {
    try {
      const user = await this.model.login(data);

      if (user) {
        // Save user to local storage
        Storage.setItem(user);
        // Switch to home page
        window.location.assign('../');
      } else {
        Toast.error(LOGIN_MESSAGE.FAILED);
      }
    } catch (error) {
      Toast.error(error);
    }
  };
}
