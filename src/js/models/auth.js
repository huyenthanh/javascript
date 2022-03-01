import userApi from '../api/userApi';

/**
 * @class AuthModel
 * Manages the data of user.
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
