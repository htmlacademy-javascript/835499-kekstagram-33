const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImg = bigPictureContainer.querySelector('.big-picture__img img');
const bigPictureCaption = bigPictureContainer.querySelector('.social__caption');
const bigPictureLikesCount = bigPictureContainer.querySelector('.social__likes .likes-count');
const bigPictureCommentsShown = bigPictureContainer.querySelector('.social__comment-shown-count');
const bigPictureCommentsTotal = bigPictureContainer.querySelector('.social__comment-total-count');
const bigPictureCloseButton = bigPictureContainer.querySelector('#picture-cancel');

function isEscape(evt) {
  return evt.key === 'Escape';
}

function eventCloseBigPicture(evt) {
  if (evt.target.classList.contains('big-picture') || evt.target.id === 'picture-cancel' || isEscape(evt)) {
    // evt.stopPropagation();
    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPictureCloseButton.removeEventListener('click', eventCloseBigPicture);
    bigPictureContainer.removeEventListener('click', eventCloseBigPicture);
    document.removeEventListener('keydown', eventCloseBigPicture);
  }
}

function createNewComment({ avatar, name, message }) {
  return `<li class="social__comment">
  <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
  <p class="social__text">${message}</p>
  </li>`;
}

function renderComments(comments) {
  const bigPictureCommentsContainer = document.querySelector('.social__comments');
  bigPictureCommentsContainer.innerHTML = '';
  comments.forEach((item) => {
    bigPictureCommentsContainer.insertAdjacentHTML('beforeend', createNewComment(item));
  });
}

function renderBigPicture({ url, description, likes, comments}) {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPictureCaption.textContent = description;
  bigPictureLikesCount.textContent = likes;
  bigPictureCommentsShown.textContent = comments.length; //Временно
  bigPictureCommentsTotal.textContent = comments.length;
  renderComments(comments);

  bigPictureCloseButton.addEventListener('click', eventCloseBigPicture);
  bigPictureContainer.addEventListener('click', eventCloseBigPicture);
  document.addEventListener('keydown', eventCloseBigPicture);

  document.querySelector('.social__comment-count').classList.add('hidden'); //Временно
  document.querySelector('.comments-loader').classList.add('hidden'); //Временно

  bigPictureContainer.classList.remove('hidden');
  bigPictureContainer.scrollTo(0,0);
  document.body.classList.add('modal-open');
}

export { renderBigPicture };

