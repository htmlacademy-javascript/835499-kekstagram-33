import { renderBigPicture } from './RenderBigPicture.js';

function renderPictures(data) {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.firstElementChild;
  const picturesListFragment = document.createDocumentFragment();

  data.forEach(({id, url, description, likes, comments}) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.dataset.id = id;
    newPicture.querySelector('img').src = url;
    newPicture.querySelector('img').alt = description;
    newPicture.querySelector('.picture__comments').textContent = comments.length;
    newPicture.querySelector('.picture__likes').textContent = likes;
    picturesListFragment.append(newPicture);
  });
  picturesContainer.append(picturesListFragment);

  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      const pictureId = +evt.target.parentElement.getAttribute('data-id');
      const actionData = data.find((item) => item.id === pictureId);
      if (actionData) {
        renderBigPicture(actionData);
      }
    }
  });
}

export { renderPictures };
