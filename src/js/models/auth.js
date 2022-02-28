import userApi from '../api/userApi';

/**
 * @class AuthModel
 * Manages the data of the application.
 */
export default class AuthModel {
  constructor() {}
  /**
   * Get data from UserApi and form for check user
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
