import userApi from '../api/userApi';

/**
 * @class AuthModel
 * Manages the data of user.
 */
export default class AuthModel {
  constructor() {}

  /**
   * Method login
   * Get data from UserApi and form for check user
   * @param {string} email the value from email input
   * @param {string} password the value from password input
   * Returns user in the provided userApi that satisfies the testing function
   */
  async login({ email, password }) {
    const users = await userApi.getAll();
    const user = users.find(
      (result) => result.email === email && result.password === password
    );

    return user;
  }
}
