import { Api } from '../api/axios-api';
import { URL_API } from '../constants';

/**
 * @class AuthModel
 * Manages the data for authentication.
 */
export default class AuthModel {
  /**
   * Call login api to user login to app
   * @param {string} email
   * @param {string} password
   */
  async login({ email, password }) {
    const users = await Api.getAll(URL_API.USER_URL);
    const user = users.find(
      (result) => result.email === email && result.password === password
    );

    return user;
  }
}
