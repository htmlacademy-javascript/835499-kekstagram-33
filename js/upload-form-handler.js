import { sendData } from './api.js';
import { appendNotification } from './upload-form-notification.js';
import { resetFiltersHandler } from './upload-form-photo-filters.js';
import { imageSettingHandler, resetImageSetting } from './upload-form-styles.js';
import { validateUploadForm } from './upload-form-validation.js';
import { isEscapeKey, showErrorMessage } from './utils.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = uploadForm.querySelector('.img-upload__input');
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
  document.body.classList.remove('modal-open');

  imageEditorContainer.removeEventListener('click', closeImageEditor);
  imageEditorCloseButton.removeEventListener('click', closeImageEditor);
  document.removeEventListener('keydown', closeImageEditor);

  uploadForm.reset();
  resetImageSetting();
  resetFiltersHandler();
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
  document.body.classList.add('modal-open');
  imageEditorContainer.addEventListener('click', closeImageEditor);
  imageEditorCloseButton.addEventListener('click', closeImageEditor);
  document.addEventListener('keydown', closeImageEditor);
  imageSettingHandler();
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
    const isValid = validateUploadForm();

    if (isValid) {
      disableSubmitButton();
      sendData(new FormData(uploadForm))
        .then(() => {
          appendNotification(templateSuccess);
          closeUploadForm();
        })
        .catch(
          (err) => {
            appendNotification(templateError);
            showErrorMessage(err.message);
          }
        )
        .finally(enableSubmitButton);
    }


  });
}

export { setUserFormSubmit };
