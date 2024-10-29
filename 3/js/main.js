const VALUES_QUANTITY = 25;
const MIN_RANGE_ID = 1;
const MAX_RANGE_ID = 25;
const MIN_RANGE_LIKES = 15;
const MAX_RANGE_LIKES = 200;
const MIN_RANGE_COMMENTS = 0;
const MAX_RANGE_COMMENTS = 30;
const MIN_RANGE_AVATAR = 1;
const MAX_RANGE_AVATAR = 6;
const NAMES = ['Николай', 'Татьяна', 'Владимир', 'Виктория', 'Матвей', 'Екатерина', 'Павел', 'Людмила'];
const MESSAGES = `Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`;


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

const getId = getUniqueNumber(MIN_RANGE_ID, MAX_RANGE_ID);
const getUrlId = getUniqueNumber(MIN_RANGE_ID, MAX_RANGE_ID);
const getLikes = getUniqueNumber(MIN_RANGE_LIKES, MAX_RANGE_LIKES);
const getCommentsValue = getUniqueNumber(MIN_RANGE_COMMENTS, MAX_RANGE_COMMENTS);
const getCommentId = getUniqueNumber();

function getRandomElement(elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

function getRandomMessage(text) {
  const messagesInArray = text.trim().replaceAll('. ', '.\n').split('\n');
  const randomMessage = Array.from({length: getRandomNumber(1, 2)}, () => getRandomElement(messagesInArray));
  return randomMessage.join(' ');
}

function getRandomDescription(text) {
  const messagesInArray = text.toLowerCase().replaceAll('\n', ' ').split(' ');
  const randomDescription = Array.from({length: getRandomNumber(2, 10)}, () => getRandomElement(messagesInArray));
  return randomDescription.join(' ');
}

function createComment() {
  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomNumber(MIN_RANGE_AVATAR, MAX_RANGE_AVATAR)}.svg`,
    message: getRandomMessage(MESSAGES),
    name: getRandomElement(NAMES),
  };
}

function getPhotoSpecification() {
  return {
    id: getId(),
    url: `photos/${getUrlId()}.jpg`,
    description: getRandomDescription(MESSAGES),
    likes: getLikes(),
    comments: Array.from({length: getCommentsValue()}, createComment),
  };
}

function getData(value) {
  return Array.from({length: value}, getPhotoSpecification);
}

getData(VALUES_QUANTITY);
// console.table(getData(VALUES_QUANTITY));
