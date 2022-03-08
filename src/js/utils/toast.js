import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const Toast = {
  success(message) {
    Toastify({
      text: message,
      duration: 2000,
      gravity: 'top',
      position: 'right',
      close: true,
      style: {
        background: '#4caf50',
      },
    }).showToast();
  },

  error(message) {
    Toastify({
      text: message,
      duration: 2000,
      gravity: 'top',
      position: 'right',
      close: true,
      style: {
        background: '#ef5350',
      },
    }).showToast();
  },
};
