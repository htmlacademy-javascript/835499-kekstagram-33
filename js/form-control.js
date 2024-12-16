import { closeUploadForm } from './form.js';
import { isEscapeKey } from './utils.js';
import { removePopup } from './popup.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const formOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeButtonElement = uploadFormElement.querySelector('#upload-cancel');

const onFormOverlayClick = (evt) => {
  if (evt.target.classList.contains('img-upload__overlay')) {
    closeUploadForm();
  }
};

const onFormCloseClick = (evt) => {
  if (evt.target.id === 'upload-cancel') {
    closeUploadForm();
  }
};

const onFormEscapeDown = (evt) => {
  if ((isEscapeKey(evt)
    && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')
    && !document.querySelector('.error'))) {
    closeUploadForm();
  }
};

const setFormCloseFormEvent = () => {
  formOverlayElement.addEventListener('click', onFormOverlayClick);
  closeButtonElement.addEventListener('click', onFormCloseClick);
  document.addEventListener('keydown', onFormEscapeDown);
};

const removeFormCloseEvent = () => {
  formOverlayElement.removeEventListener('click', onFormOverlayClick);
  closeButtonElement.removeEventListener('click', onFormCloseClick);
  document.removeEventListener('keydown', onFormEscapeDown);
};

const onPopupEscapeDown = (evt) => {
  if (isEscapeKey(evt)) {
    removePopup();
  }
};

const setPopupEscapeControl = () => {
  document.addEventListener('keydown', onPopupEscapeDown);
};

const removePopupEscapeControl = () => {
  document.removeEventListener('keydown', onPopupEscapeDown);
};

export { setFormCloseFormEvent, removeFormCloseEvent, setPopupEscapeControl, removePopupEscapeControl };
