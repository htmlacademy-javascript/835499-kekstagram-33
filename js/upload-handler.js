import { sendData } from './api.js';
import { appendNotification } from './upload-notification.js';
import { initFilters, resetFilters } from './upload-filters.js';
import { initScaleHandler, resetImageScale } from './upload-styles.js';
import { checkValidation, removeValidation } from './upload-validation.js';
import { isEscapeKey, showErrorMessage } from './utils.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = uploadForm.querySelector('.img-upload__input');
const hashtagsField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const imageEditorContainer = uploadForm.querySelector('.img-upload__overlay');
const imageEditorCloseButton = uploadForm.querySelector('#upload-cancel');
const imageMainPreview = document.querySelector('.img-upload__preview img');
const imageEffectsPreview = document.querySelectorAll('.effects__preview');
const templateSuccess = document.querySelector('#success').content.firstElementChild;
const templateError = document.querySelector('#error').content.firstElementChild;

const FILE_TYPES = ['png', 'jpg', 'jpeg'];
const SubmitButtonText = {
  DEFAULT: 'Сохраняю...',
  SENDING: 'Опубликовать',
};

function isEventClose(evt) {
  return (
    evt.target.classList.contains('img-upload__overlay')
    || evt.target.id === 'upload-cancel'
    || (isEscapeKey(evt)
    && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description'))
  );
}

function closeUploadForm() {
  imageEditorContainer.classList.add('hidden');
  imageEditorContainer.hidden = true;
  document.body.classList.remove('modal-open');

  imageEditorContainer.removeEventListener('click', closeImageEditor);
  imageEditorCloseButton.removeEventListener('click', closeImageEditor);
  document.removeEventListener('keydown', closeImageEditor);
  hashtagsField.removeEventListener('change', checkValidation);
  descriptionField.removeEventListener('change', checkValidation);

  uploadForm.reset();
  resetImageScale();
  resetFilters();
  removeValidation();
}

function closeImageEditor(evt) {
  if (isEventClose(evt)){
    evt.preventDefault();
    closeUploadForm();
  }
}

function isValidType(file) {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((item) => fileName.endsWith(item));
}

function onInputChange() {
  const file = uploadButton.files[0];
  if (file && isValidType(file)) {
    imageMainPreview.src = URL.createObjectURL(file);
    imageEffectsPreview.forEach((item) => {
      item.style.backgroundImage = `url('${imageMainPreview.src}')`;
    });
  }
  showImageEditor();
}

function showImageEditor() {
  imageEditorContainer.classList.remove('hidden');
  imageEditorContainer.hidden = false;
  document.body.classList.add('modal-open');
  hashtagsField.addEventListener('input', checkValidation);
  descriptionField.addEventListener('input', checkValidation);
  imageEditorContainer.addEventListener('click', closeImageEditor);
  imageEditorCloseButton.addEventListener('click', closeImageEditor);
  document.addEventListener('keydown', closeImageEditor);
  initScaleHandler();
  initFilters();
}

function disableSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.DEFAULT;
}

function enableSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.SENDING;
}

function setUserFormSubmit() {
  uploadButton.addEventListener('change', onInputChange);
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (checkValidation()) {
      disableSubmitButton();
      sendData(new FormData(uploadForm))
        .then(() => {
          closeUploadForm();
          appendNotification(templateSuccess);
        })
        .catch(
          (err) => {
            appendNotification(templateError);
            showErrorMessage(err.message);
          }
        )
        .finally(() => {
          enableSubmitButton();
        });
    }
  });
}

export { setUserFormSubmit };
