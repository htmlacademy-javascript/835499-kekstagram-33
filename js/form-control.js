import { closeUploadForm } from './form.js';
import { isEscapeKey } from './utils.js';


const uploadFormElement = document.querySelector('.img-upload__form');
const formOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeButtonElement = uploadFormElement.querySelector('#upload-cancel');

const onOverlayClick = (evt) => {
  if (evt.target.classList.contains('img-upload__overlay')) {
    closeUploadForm();
  }
};

const onCloseButtonClick = (evt) => {
  if (evt.target.id === 'upload-cancel') {
    closeUploadForm();
  }
};

const onEscapeDown = (evt) => {
  if ((isEscapeKey(evt)
    && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')
    && !document.querySelector('.error'))) {
    closeUploadForm();
  }
};

const setCloseFormEvent = () => {
  formOverlayElement.addEventListener('click', onOverlayClick);
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscapeDown);
};

const resetCloseFormEvent = () => {
  formOverlayElement.removeEventListener('click', onOverlayClick);
  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onEscapeDown);
};

export { setCloseFormEvent, resetCloseFormEvent };
