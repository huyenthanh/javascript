import { ERROR_MESSAGE } from '../constants/message';
import { REGEX_VALUE } from '../constants/regex-value';

const isRequired = (value) => {
  return Boolean(value);
};

const isEmailValid = (email) => {
  return REGEX_VALUE.REGEX_EMAIL.test(email.trim());
};

const isPasswordValid = (pass) => {
  return REGEX_VALUE.REGEX_PASSWORD.test(pass.trim());
};

/**
 * Function check email
 * Value field email empty
 * Value field password address at less than 8 characters
 * @param {object} form
 */
const checkEmail = (form) => {
  const emailElement = form.querySelector('[name="email"]');
  if (!emailElement) return;

  if (!isRequired(emailElement.value)) return ERROR_MESSAGE.EMAIL_REQUIRED;

  if (!isEmailValid(emailElement.value)) return ERROR_MESSAGE.EMAIL_VALID;

  return '';
};

/**
 * Function check password
 * Value field password empty
 * Value field password address at less than 8 characters
 * @param {object} form
 */
const checkPassword = (form) => {
  const passwordElement = form.querySelector('[name="password"]');
  if (!passwordElement) return;

  if (!isRequired(passwordElement.value))
    return ERROR_MESSAGE.PASSWORD_REQUIRED;

  if (!isPasswordValid(passwordElement.value))
    return ERROR_MESSAGE.PASSWORD_VALID;

  return '';
};

export { checkEmail, checkPassword };
