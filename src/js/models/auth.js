import userApi from '../api/user-api';

/**
 * @class AuthModel
 * Manages the data for authentication.
 */
export default class AuthModel {
  constructor() {}

  /**
   * Call login api to user login to app
   * @param {string} email
   * @param {string} password
   */
  async login({ email, password }) {
    const users = await userApi.getAll();
    const user = users.find(
      (result) => result.email === email && result.password === password
    );

    return user;
  }
}
