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
  if (element) element.textContent = text;
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

export {getElementById, setTextContent, getFormValues };
