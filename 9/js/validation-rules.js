const MAX_HASHTAGS = 5;
const MAX_DESCRIPTION = 140;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{0,19}$/i;

const hashtagFieldElement = document.querySelector('.text__hashtags');
const descriptionFieldElement = document.querySelector('.text__description');

const hashtagsState = {
  isQuantityError: false,
  isUniqueError: false,
  isValidateError: false,
};

const HashtagErrorMessages = {
  quantityErrorText: 'превышено количество хэштегов',
  uniqueErrorText: 'хэштеги повторяются',
  validateErrorText: 'введён невалидный хэштег',
};

let hashtagsArray = [];

function initHashtagsArray() {
  const hashtagsSplitted = hashtagFieldElement.value.split(' ');
  hashtagsArray = hashtagsSplitted.filter((item) => (item !== '' ? item.toLowerCase() : null));
}

function checkHashtagQuantity() {
  if (hashtagFieldElement.value !== '' && hashtagsArray.length > MAX_HASHTAGS) {
    hashtagsState.isQuantityError = true;
  } else {
    hashtagsState.isQuantityError = false;
  }
}

function checkHashtagUnique() {
  const result = [];
  hashtagsState.isUniqueError = false;
  for (const item of hashtagsArray) {
    if (!result.includes(item)) {
      result.push(item);
    } else {
      hashtagsState.isUniqueError = true;
    }
  }
}

function checkHashtagsValid() {
  hashtagsState.isValidateError = !hashtagsArray.every((item) => (HASHTAG_REGEXP.test(item)));
}

function validateHashtagHandler() {
  initHashtagsArray();
  checkHashtagQuantity();
  checkHashtagUnique();
  checkHashtagsValid();

  const stateValues = Object.values(hashtagsState);
  return stateValues.reduce((acc, item) => acc & !item , true);
}

function getHashtagMessage() {
  const errorKeys = Object.keys(hashtagsState);
  const messageValues = Object.values(HashtagErrorMessages);
  const result = errorKeys.reduce((acc, item, index) => {
    if (hashtagsState[item]) {
      return [...acc, messageValues[index]];
    }
    return acc;
  }, []);

  return result;
}

function validateDescriptionHandler() {
  if(descriptionFieldElement.value.length > MAX_DESCRIPTION) {
    return false;
  }
  return true;
}

function getDescriptionMessage() {
  return `длина комментария больше ${MAX_DESCRIPTION} символов`;
}

export { validateHashtagHandler, validateDescriptionHandler, getHashtagMessage, getDescriptionMessage};
