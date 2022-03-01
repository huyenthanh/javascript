import { ERROR_MESSAGE } from '../constants/message';
import { REGEX_VALUE } from '../constants/regex-value';

/**
 * Function get email error
 * Value field email empty
 * Value field password address at less than 8 characters
 * @param {object} form
 */
const getEmailError = (form) => {
  const emailElement = form.querySelector('[name="email"]');
  if (!emailElement) return;

  if (!emailElement.value) return ERROR_MESSAGE.EMAIL_REQUIRED;

  if (!REGEX_VALUE.REGEX_EMAIL.test(emailElement.value.trim()))
    return ERROR_MESSAGE.EMAIL_VALID;
  return '';
};

/**
 * Function get password error
 * Value field password empty
 * Value field password address at less than 8 characters
 * @param {object} form
 */
const getPasswordError = (form) => {
  const passwordElement = form.querySelector('[name="password"]');
  if (!passwordElement) return;

  if (!passwordElement.value) return ERROR_MESSAGE.PASSWORD_REQUIRED;

  if (!REGEX_VALUE.REGEX_PASSWORD.test(passwordElement.value.trim()))
    return ERROR_MESSAGE.PASSWORD_VALID;
  return '';
};

export { getEmailError, getPasswordError };
