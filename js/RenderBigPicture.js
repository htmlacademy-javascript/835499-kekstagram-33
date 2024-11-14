const COMMENTS_COUNT = 5;

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCommentsLoader = document.querySelector('.comments-loader');
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

function showUploadButton(bool) {
  if (bool) {
    document.querySelector('.comments-loader').classList.remove('hidden');
  } else {
    document.querySelector('.comments-loader').classList.add('hidden');
  }
}

function renderComments(comments, count) {
  bigPictureContainer.querySelector('.social__comment-shown-count').textContent = count;
  bigPictureContainer.querySelector('.social__comment-total-count').textContent = comments.length;
  const bigPictureCommentsContainer = document.querySelector('.social__comments');
  const commentsArray = [];
  bigPictureCommentsContainer.innerHTML = '';
  for (let i = 0; i < count; i++) {
    commentsArray.push(createNewComment(comments[i]));
  }
  bigPictureCommentsContainer.insertAdjacentHTML('beforeend', commentsArray.join(''));
  showUploadButton(count < comments.length);
}

function commentsHandler(comments) {
  let commentsCount = COMMENTS_COUNT;
  if (comments.length < commentsCount - 1) {
    renderComments(comments, comments.length);
  } else {
    renderComments(comments, commentsCount);
    bigPictureCommentsLoader.addEventListener('click', () => {
      commentsCount += COMMENTS_COUNT;
      if (commentsCount < comments.length) {
        renderComments(comments, commentsCount);
      } else {
        renderComments(comments, comments.length);
      }
    });
  }
}

function isEscape(evt) {
  return evt.key === 'Escape';
}

function closeBigPictureEvent(evt) {
  if (evt.target.classList.contains('big-picture') || evt.target.id === 'picture-cancel' || isEscape(evt)) {
    // evt.stopPropagation();
    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPictureCloseButton.removeEventListener('click', closeBigPictureEvent);
    bigPictureContainer.removeEventListener('click', closeBigPictureEvent);
    document.removeEventListener('keydown', closeBigPictureEvent);
  }
}

function renderBigPicture(data) {
  pictureHandler(data);
  commentsHandler(data.comments);

  bigPictureCloseButton.addEventListener('click', closeBigPictureEvent);
  bigPictureContainer.addEventListener('click', closeBigPictureEvent);
  document.addEventListener('keydown', closeBigPictureEvent);

  bigPictureContainer.classList.remove('hidden');
  bigPictureContainer.scrollTo(0,0);
  document.body.classList.add('modal-open');
}

export { renderBigPicture };

