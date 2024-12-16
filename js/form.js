import { ERROR_FILE_MESSAGE } from './init.js';
import { setFilters, removeFilters } from './form-filters.js';
import { setScale, removeScale } from './form-scale.js';
import { setValidation, removeValidation } from './form-validation.js';
import { setFormCloseFormEvent, removeFormCloseEvent, } from './form-control.js';
import { isFileValid } from './file-validation.js';
import { removeSubmit, setSubmit } from './form-submit.js';
import { showErrorMessage } from './popup.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileElement = uploadFormElement.querySelector('#upload-file');
const formOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const imagePreviewElement = uploadFormElement.querySelector('.img-upload__preview img');
const imageEffectsElements = uploadFormElement.querySelectorAll('.effects__preview');

const setFilePreview = () => {
  imagePreviewElement.src = URL.createObjectURL(uploadFileElement.files[0]);
  imageEffectsElements.forEach((item) => {
    item.style.backgroundImage = `url('${imagePreviewElement.src}')`;
  });
};

const openUploadForm = () => {
  formOverlayElement.classList.remove('hidden');
  formOverlayElement.hidden = false;
  document.body.classList.add('modal-open');
};

const closeUploadForm = () => {
  formOverlayElement.classList.add('hidden');
  formOverlayElement.hidden = true;
  document.body.classList.remove('modal-open');

  uploadFormElement.reset();
  removeScale();
  removeFilters();
  removeValidation();
  removeFormCloseEvent();
  removeSubmit();
};

const onUploadButtonChange = () => {
  if (isFileValid()) {
    openUploadForm();
    setFilePreview();
    setScale();
    setFilters();
    setValidation();
    setFormCloseFormEvent();
    setSubmit();
  } else {
    showErrorMessage(ERROR_FILE_MESSAGE);
  }
};

const setUploadForm = () => {
  uploadFileElement.addEventListener('change', onUploadButtonChange); // onUploadInpurChange
};

export { setUploadForm, closeUploadForm };
