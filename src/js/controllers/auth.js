import { LOGIN_MESSAGE } from '../../constants/message';
import STORAGE_KEYS from '../../constants/storage-keys';
import { toast } from '../utils/toast';

/**
 * @class AuthController
 * Links the user input and the view output.
 * @param model
 * @param view
 */
export default class AuthController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.getLoginForm(this.handleLogin);
  }

  /**
   * Get user from model
   * User, save data to local storage and switch to home page
   * No user, show error
   * @param {data} object
   */
  handleLogin = async (data) => {
    try {
      const user = await this.model.login(data);
      if (user) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, '82jdu82193yh90sad83hxfgsd');
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        toast.success(LOGIN_MESSAGE.SUCCEED);
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
