import { POPUP_ERROR_TIME } from './init.js';
import { setPopupEscapeControl, removePopupEscapeControl } from './form-control.js';

const successTemplateElement = document.querySelector('#success').content.firstElementChild;
const errorTemplateElement = document.querySelector('#error').content.firstElementChild;
const alertTemplate = document.querySelector('#data-error').content.firstElementChild;

const Notices = {
  success: successTemplateElement,
  error: errorTemplateElement
};

const showErrorMessage = (message) => {
  const newAlert = alertTemplate.cloneNode(true);
  newAlert.textContent = message;
  document.body.append(newAlert);

  setTimeout(() => {
    newAlert.remove();
  }, POPUP_ERROR_TIME);
};

let newPopup = '';

const removePopup = () => {
  newPopup.remove();
  removePopupEscapeControl();
};

const showPopup = (type) => {
  newPopup = Notices[type].cloneNode(true);
  document.body.append(newPopup);

  newPopup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(type) || evt.target.classList.contains(`${type}__button`)) {
      newPopup.remove();
    }
  });

  setPopupEscapeControl();
};

export { showErrorMessage, showPopup, removePopup};
