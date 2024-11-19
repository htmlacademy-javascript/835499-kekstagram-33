const COMMENTS_COUNT = 5;

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPictureContainer.querySelector('#picture-cancel');

function pictureHandler({ url, description, likes}) {
  bigPictureContainer.querySelector('.big-picture__img img').src = url;
  bigPictureContainer.querySelector('.big-picture__img img').alt = description;
  bigPictureContainer.querySelector('.social__caption').textContent = description;
  bigPictureContainer.querySelector('.social__likes .likes-count').textContent = likes;
}

function createNewComment({ avatar, name, message}) {
  return `<li class="social__comment">
  <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
  <p class="social__text">${message}</p>
  </li>`;
}

function renderComments(comments, count) {
  bigPictureContainer.querySelector('.social__comment-shown-count').textContent = count;
  bigPictureContainer.querySelector('.social__comment-total-count').textContent = comments.length;

  const bigPictureCommentsContainer = document.querySelector('.social__comments');
  bigPictureCommentsContainer.innerHTML = '';

  const commentsArray = [];
  for (let i = 0; i < count; i++) {
    commentsArray.push(createNewComment(comments[i]));
  }
  bigPictureCommentsContainer.insertAdjacentHTML('beforeend', commentsArray.join(''));
}

function showLoadMoreButton(bool) {
  if (bool) {
    document.querySelector('.comments-loader').classList.remove('hidden');
  } else {
    document.querySelector('.comments-loader').classList.add('hidden');
  }
}

function commentsHandler(comments) {
  let commentsCount = comments.length < COMMENTS_COUNT - 1 ? comments.length : COMMENTS_COUNT;
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
}

function isEscape(evt) {
  return evt.key === 'Escape';
}

function onCloseBigPicture(evt) {
  if (evt.target.classList.contains('big-picture') || evt.target.id === 'picture-cancel' || isEscape(evt)) {
    evt.preventDefault();
    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPictureCloseButton.removeEventListener('click', onCloseBigPicture);
    bigPictureContainer.removeEventListener('click', onCloseBigPicture);
    document.removeEventListener('keydown', onCloseBigPicture);
  }
}

function showBigPicture() {
  bigPictureContainer.classList.remove('hidden');
  bigPictureContainer.scrollTo(0,0);
  document.body.classList.add('modal-open');
  bigPictureCloseButton.addEventListener('click', onCloseBigPicture);
  bigPictureContainer.addEventListener('click', onCloseBigPicture);
  document.addEventListener('keydown', onCloseBigPicture);
}

function renderBigPicture(data) {
  pictureHandler(data);
  commentsHandler(data.comments);
  showBigPicture();
}

export { renderBigPicture };

