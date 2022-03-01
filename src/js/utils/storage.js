import STORAGE_KEYS from '../constants/storage-keys';

/**
 * @class Storage
 * Manage data stored in the browser
 */
export default class Storage {
  static setItem(data) {
    return localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
  }

  static getItem() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));
  }

  static removeItem() {
    return localStorage.removeItem(STORAGE_KEYS.USER);
  }
}
