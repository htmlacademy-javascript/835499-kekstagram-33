import { POPUP_ERROR_TIME } from './init.js';
import { isEscapeKey } from './utils.js';


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


const showPopup = (type) => {
  const newPopup = Notices[type].cloneNode(true);
  document.body.append(newPopup);

  newPopup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(type) || evt.target.classList.contains(`${type}__button`)) {
      newPopup.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      newPopup.remove();
    }
  }, {once: true});

};

export { showPopup, showErrorMessage };
