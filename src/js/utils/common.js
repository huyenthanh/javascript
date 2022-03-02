import Storage from '../utils/storage';

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
 * Function check login
 * User login, header display username information, add post link and logout
 * User is not login, display login link
 * @param {object} form
 */
function checkLogin() {
  const addEditElement = getElementById('add-edit');
  const loginElement = getElementById('login');
  const userDropdown = getElementById('dropdown');
  const user = Storage.getItem();

  if (user) {
    loginElement.remove();
    addEditElement.textContent = 'Add a new post';
    setTextContent(userDropdown, '.avatar', user.avatar);
    setTextContent(userDropdown, '.username', user.userName);
    setTextContent(userDropdown, '.logout', 'Logout');
  } else {
    userDropdown.remove();
    addEditElement.remove();
    loginElement.textContent = 'Login';
  }
}

export { getElementById, setTextContent, getFormValues, checkLogin };
