import { SUBMIT_TEXT } from './init.js';
import { sendData } from './api.js';
import { closeUploadForm } from './form.js';
import { showPopup, showErrorMessage } from './popup.js';
import { isValid } from './form-validation.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

const enableSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SUBMIT_TEXT.SENDING;
};

const disableSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SUBMIT_TEXT.DEFAULT;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (isValid()) {
    disableSubmitButton();
    sendData(new FormData(uploadFormElement))
      .then(() => {
        closeUploadForm();
        showPopup('success');
      })
      .catch(
        (err) => {
          showPopup('error');
          showErrorMessage(err.message);
        }
      )
      .finally(() => {
        enableSubmitButton();
      });
  }
};

const setSubmit = () => {
  uploadFormElement.addEventListener('submit', onFormSubmit);
};

const removeSubmit = () => {
  uploadFormElement.removeEventListener('submit', onFormSubmit);
};

export { setSubmit, removeSubmit };
