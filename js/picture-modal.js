import { COMMENTS_COUNT, AVATAR_WIDTH, AVATAR_HEIGHT } from './init.js';


const pictureContainerElement = document.querySelector('.big-picture');
const pictureCloseButtonElement = pictureContainerElement.querySelector('#picture-cancel');

const getPicture = ({ url, description, likes}) => {
  pictureContainerElement.querySelector('.big-picture__img img').src = url;
  pictureContainerElement.querySelector('.big-picture__img img').alt = description;
  pictureContainerElement.querySelector('.social__caption').textContent = description;
  pictureContainerElement.querySelector('.social__likes .likes-count').textContent = likes;
};

const createNewComment = ({avatar, name, message}) => {
  const newComment = document.createDocumentFragment().cloneNode(true);
  const li = document.createElement('li');
  const img = document.createElement('img');
  const p = document.createElement('p');
  li.classList.add('social__comment');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = AVATAR_WIDTH;
  img.height = AVATAR_HEIGHT;
  p.classList.add('social__text');
  p.textContent = message;
  li.append(img, p);
  newComment.append(li);

  return newComment;
};

const renderComments = (comments, count) => {
  pictureContainerElement.querySelector('.social__comment-shown-count').textContent = count;
  pictureContainerElement.querySelector('.social__comment-total-count').textContent = comments.length;

  const bigPictureCommentsContainer = document.querySelector('.social__comments');
  bigPictureCommentsContainer.innerHTML = '';

  for (let i = 0; i < count; i++) {
    bigPictureCommentsContainer.append(createNewComment(comments[i]));
  }
};

const showLoadMoreButton = (bool) => {
  if (bool) {
    document.querySelector('.comments-loader').classList.remove('hidden');
  } else {
    document.querySelector('.comments-loader').classList.add('hidden');
  }
};

const getComment = (comments) => {
  let commentsCount = comments.length < COMMENTS_COUNT ? comments.length : COMMENTS_COUNT;
  renderComments(comments, commentsCount);
  showLoadMoreButton(commentsCount < comments.length);

  const commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.addEventListener('click', () => {
    commentsCount += COMMENTS_COUNT;
    if (commentsCount < comments.length) {
      renderComments(comments, commentsCount);
      showLoadMoreButton(true);
    } else {
      renderComments(comments, comments.length);
      showLoadMoreButton(false);
    }
  });
};

const isEscape = (evt) => evt.key === 'Escape';

const onCloseBigPicture = (evt) => {
  if (evt.target.classList.contains('big-picture') || evt.target.id === 'picture-cancel' || isEscape(evt)) {
    evt.preventDefault();
    pictureContainerElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    pictureCloseButtonElement.removeEventListener('click', onCloseBigPicture);
    pictureContainerElement.removeEventListener('click', onCloseBigPicture);
    document.removeEventListener('keydown', onCloseBigPicture);
  }
};

const showBigPicture = () => {
  pictureContainerElement.classList.remove('hidden');
  pictureContainerElement.scrollTo(0,0);
  document.body.classList.add('modal-open');
  pictureCloseButtonElement.addEventListener('click', onCloseBigPicture);
  pictureContainerElement.addEventListener('click', onCloseBigPicture);
  document.addEventListener('keydown', onCloseBigPicture);
};

const renderBigPicture = (data) => {
  getPicture(data);
  getComment(data.comments);
  showBigPicture();
};

export { renderBigPicture };
