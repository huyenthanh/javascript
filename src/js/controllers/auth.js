import { LOGIN_MESSAGE } from '../constants/message';
import Storage from '../utils/storage';
import { toast } from '../utils/toast';

/**
 * @class AuthController
 * Authentication controller for user
 */
export default class AuthController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.getLoginForm(this.handleLogin);
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
        toast.success(LOGIN_MESSAGE.SUCCEED);
        // Switch to home page after 1s
        setTimeout(() => {
          window.location.assign('../');
        }, 1000);
      } else {
        toast.error(LOGIN_MESSAGE.FAILED);
      }
    } catch (error) {
      toast.error(error);
    }
  };
}
