import * as Random from './utils.js';

const Init = {
  QUANTITY: 25,
  MIN_RANGE_ID: 1,
  MAX_RANGE_ID: 25,
  MIN_RANGE_LIKES: 15,
  MAX_RANGE_LIKES: 200,
  MIN_RANGE_COMMENTS: 0,
  MAX_RANGE_COMMENTS: 30,
  MIN_RANGE_AVATAR: 1,
  MAX_RANGE_AVATAR: 6,
  NAMES: ['Николай', 'Татьяна', 'Владимир', 'Виктория', 'Матвей', 'Екатерина', 'Павел', 'Людмила'],
  MESSAGES: `Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
};

const getId = Random.getUniqueNumber(Init.MIN_RANGE_ID, Init.MAX_RANGE_ID);
const getUrlId = Random.getUniqueNumber(Init.MIN_RANGE_ID, Init.MAX_RANGE_ID);
const getDescription = Random.getRandomDescription(Init.MESSAGES);
const getLikes = Random.getUniqueNumber(Init.MIN_RANGE_LIKES, Init.MAX_RANGE_LIKES);
const getCommentsValue = Random.getUniqueNumber(Init.MIN_RANGE_COMMENTS, Init.MAX_RANGE_COMMENTS);
const getCommentId = Random.getUniqueNumber();

function createComment() {
  return {
    id: getCommentId(),
    avatar: `img/avatar-${Random.getRandomNumber(Init.MIN_RANGE_AVATAR, Init.MAX_RANGE_AVATAR)}.svg`,
    message: Random.getRandomMessage(Init.MESSAGES),
    name: Random.getRandomElement(Init.NAMES),
  };
}

function createInfo() {
  return {
    id: getId(),
    url: `photos/${getUrlId()}.jpg`,
    description: getDescription(),
    likes: getLikes(),
    comments: Array.from({length: getCommentsValue()}, createComment),
  };
}

function createTestData(value) {
  return Array.from({length: value}, createInfo);
}

export { createTestData };
