import Init from './init-values.js';
import * as Random from './random-utils.js';

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

export { createInfo };

