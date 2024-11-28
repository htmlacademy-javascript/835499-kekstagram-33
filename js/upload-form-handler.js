import { validateUploadForm } from './upload-form-validation.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = uploadForm.querySelector('.img-upload__input');
const imageEditorContainer = uploadForm.querySelector('.img-upload__overlay');
const imageEditorCloseButton = uploadForm.querySelector('#upload-cancel');

function isEscape(evt) {
  return (
    evt.key === 'Escape'
    && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')
  );
}

function clearUploadForm() {
  uploadButton.value = '';
}

function closeImageEditor(evt) {
  if (evt.target.classList.contains('img-upload__overlay') || evt.target.id === 'upload-cancel' || isEscape(evt)){
    evt.preventDefault();
    imageEditorContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    imageEditorContainer.removeEventListener('click', closeImageEditor);
    imageEditorCloseButton.removeEventListener('click', closeImageEditor);
    document.removeEventListener('keydown', closeImageEditor);
    clearUploadForm();
  }
}

function showImageEditor() {
  imageEditorContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imageEditorContainer.addEventListener('click', closeImageEditor);
  imageEditorCloseButton.addEventListener('click', closeImageEditor);
  document.addEventListener('keydown', closeImageEditor);
}

uploadButton.addEventListener('change', showImageEditor);

validateUploadForm();
