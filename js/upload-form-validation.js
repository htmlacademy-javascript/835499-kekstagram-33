const MAX_HASHTAGS = 5;
const MAX_DESCRIPTION = 140;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MESSAGES = {
  hashtagValidateErrorText: 'введён невалидный хэштег',
  hashtagUniqueErrorText: 'хэштеги повторяются',
  hashtagQuantityErrorText: 'превышено количество хэштегов',
  descriptionErrorText: `длина комментария больше ${MAX_DESCRIPTION} символов`,
};

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagFieldElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionFieldElement = uploadFormElement.querySelector('.text__description');

let hashtagsArray = [];
function initHashtagsArray() {
  hashtagsArray = hashtagFieldElement.value.replaceAll(/\s+/g, ' ').trim().split(' ');
}

function checkHashtagsValid() {
  return hashtagFieldElement.value === '' || hashtagsArray.every((item) => (HASHTAG_REGEXP.test(item)));
}

function checkHashtagUnique() {
  const filteredArray = hashtagsArray.filter((elem, index) => index === hashtagsArray.indexOf(elem));
  return filteredArray.length === hashtagsArray.length;
}

function checkHashtagQuantity() {
  return !(hashtagFieldElement.value && hashtagsArray.length > MAX_HASHTAGS);
}

function checkDescriptionLength() {
  return !(descriptionFieldElement.value && descriptionFieldElement.value.length > MAX_DESCRIPTION);
}

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
};

const pristine = new Pristine(uploadFormElement, pristineConfig, false);

pristine.addValidator(hashtagFieldElement, checkHashtagsValid, MESSAGES.hashtagValidateErrorText);
pristine.addValidator(hashtagFieldElement, checkHashtagUnique, MESSAGES.hashtagUniqueErrorText);
pristine.addValidator(hashtagFieldElement, checkHashtagQuantity, MESSAGES.hashtagQuantityErrorText);
pristine.addValidator(descriptionFieldElement, checkDescriptionLength, MESSAGES.descriptionErrorText);


function validateUploadForm() {
  initHashtagsArray();
  return pristine.validate();
}

export { validateUploadForm };
