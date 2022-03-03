import { Storage } from '../utils';

/**
 * Function retrieve an element from the DOM
 * @param {string} selector
 */
function getElementById(selector) {
  const element = document.getElementById(selector);
  if (!element) return;
  return element;
}

/**
 * Function set text content
 * @param {object} parent
 * @param {string} selector
 * @param {string} text
 */
function setTextContent(parent, selector, text) {
  if (!parent) return;

  const element = parent.querySelector(selector);
  if (element) {
    element.textContent = text;
  }
}

/**
 * Function get values in form
 * @param {object} form
 */
function getFormValues(form) {
  const formValues = {};
  const data = new FormData(form);

  for (const [key, value] of data) {
    formValues[key] = value;
  }
  return formValues;
}

/**
 * Function set field value
 * @param {object} form
 * @param {string} selector
 * @param {string} value
 */
function setFieldValue(form, selector, value) {
  if (!form) return;

  const field = form.querySelector(selector);
  if (field) field.value = value;
}

/**
 * Function check login
 * User login, header display username information, add post link and logout
 * User is not login, display login link
 */
function userAuthenticated() {
  const addEditElement = getElementById('add-edit');
  const loginElement = getElementById('login');
  const userDropdown = getElementById('dropdown');
  const userAvatar = userDropdown.querySelector('.avatar');
  const user = Storage.getItem();

  if (user) {
    loginElement.remove();
    if (addEditElement) addEditElement.textContent = 'Add a new post';
    if (userAvatar) userAvatar.src = user.avatar;
    setTextContent(userDropdown, '.username', user.userName);
    setTextContent(userDropdown, '.logout', 'Logout');
  } else {
    userDropdown.remove();
    addEditElement.remove();
    loginElement.textContent = 'Login';
  }
}

export {
  getElementById,
  setTextContent,
  getFormValues,
  userAuthenticated,
  setFieldValue,
};
