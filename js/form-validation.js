import { MAX_HASHTAGS, MAX_DESCRIPTION, HASHTAG_REGEXP, MESSAGES } from './init.js';

let pristineHashtag = false;
let pristineDescription = false;
let hashtagsArray = [];
const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
};

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagFieldElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionFieldElement = uploadFormElement.querySelector('.text__description');

const initHashtagsArray = () => {
  hashtagsArray = hashtagFieldElement.value.replaceAll(/\s+/g, ' ').trim().toLowerCase().split(' ');
};

const checkHashtagsValid = () => hashtagFieldElement.value === '' || hashtagsArray.every((item) => (HASHTAG_REGEXP.test(item)));

const checkHashtagUnique = () => {
  const filteredArray = hashtagsArray.filter((elem, index) => index === hashtagsArray.indexOf(elem));
  return filteredArray.length === hashtagsArray.length;
};

const checkHashtagQuantity = () => !(hashtagFieldElement.value && hashtagsArray.length > MAX_HASHTAGS);

const checkDescriptionLength = () => !(descriptionFieldElement.value && descriptionFieldElement.value.length > MAX_DESCRIPTION);

const onHashtagInput = () => {
  initHashtagsArray();
  pristineHashtag = new Pristine(uploadFormElement, pristineConfig, false);
  pristineHashtag.addValidator(hashtagFieldElement, checkHashtagsValid, MESSAGES.HASHTAG_ERROR);
  pristineHashtag.addValidator(hashtagFieldElement, checkHashtagUnique, MESSAGES.HASHTAG_UNIQUE_ERROR);
  pristineHashtag.addValidator(hashtagFieldElement, checkHashtagQuantity, MESSAGES.HASHTAG_QUANTITY_ERROR);
  return pristineHashtag.validate();
};

const onDescriptionInput = () => {
  pristineDescription = new Pristine(uploadFormElement, pristineConfig, false);
  pristineDescription.addValidator(descriptionFieldElement, checkDescriptionLength, MESSAGES.DESCRIPTION_ERROR);
  return pristineDescription.validate();
};

const isValid = () => onHashtagInput() && onDescriptionInput();

const setValidation = () => {
  hashtagFieldElement.addEventListener('input', onHashtagInput);
  descriptionFieldElement.addEventListener('input', onDescriptionInput);
};

const resetValidation = () => {
  if (pristineHashtag) {
    pristineHashtag.destroy();
  }
  if (pristineDescription) {
    pristineDescription.destroy();
  }
};

const removeValidation = () => {
  hashtagFieldElement.removeEventListener('input', onHashtagInput);
  descriptionFieldElement.removeEventListener('input', onDescriptionInput);
  resetValidation();
};

export { setValidation, removeValidation, isValid };
