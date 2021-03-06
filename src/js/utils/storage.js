import { STORAGE_KEYS } from '../constants';

/**
 * @class Storage
 * Manage data stored in the browser
 */
export class Storage {
  static setItem(data) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
  }

  static getItem() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));
  }

  static removeItem() {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
}
