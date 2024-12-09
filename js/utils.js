function getRandomNumber(a, b) {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getUniqueNumber (min = 0, max = 1000) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= (max - min + 1)) {
      // console.error('Перебраны все числа из диапазона');
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function getRandomElement(elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

function getRandomMessage(text) {
  const messagesInArray = text.trim().replaceAll('. ', '.\n').split('\n');
  const randomMessage = Array.from({length: getRandomNumber(1, 2)}, () => getRandomElement(messagesInArray));
  return randomMessage.join(' ');
}

function getRandomDescription(text) {
  return function() {
    const messagesInArray = text.toLowerCase().replaceAll('\n', ' ').split(' ');
    const randomDescriptionArray = Array.from({length: getRandomNumber(2, 7)}, () => getRandomElement(messagesInArray));
    const randomDescription = randomDescriptionArray.join(' ');
    return randomDescription[0].toLocaleUpperCase() + randomDescription.slice(1);
  };
}

const ERROR_SHOW_TIME = 5000;
const showErrorMessage = (message) => {
  const alertTemplate = document.querySelector('#data-error').content.firstElementChild;
  const newAlert = alertTemplate.cloneNode(true);
  newAlert.textContent = message;
  document.body.append(newAlert);

  setTimeout(() => {
    newAlert.remove();
  }, ERROR_SHOW_TIME);
};

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function isEnterKey(evt) {
  return evt.key === 'isEnterKey';
}

export {
  getRandomNumber,
  getUniqueNumber,
  getRandomElement,
  getRandomMessage,
  getRandomDescription,
  isEscapeKey,
  isEnterKey,
  showErrorMessage,
};
