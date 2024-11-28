
import { getDescriptionMessage, getHashtagMessage, validateDescriptionHandler, validateHashtagHandler } from './validation-rules.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagFieldElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionFieldElement = uploadFormElement.querySelector('.text__description');

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
};

const pristine = new Pristine(uploadFormElement, pristineConfig, false);

pristine.addValidator(hashtagFieldElement, validateHashtagHandler, getHashtagMessage);
pristine.addValidator(descriptionFieldElement, validateDescriptionHandler, getDescriptionMessage);


export function validateUploadForm() {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      uploadFormElement.submit();
    }
  });
}
