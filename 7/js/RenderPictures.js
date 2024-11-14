import { renderBigPicture } from './RenderBigPicture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.firstElementChild;
const picturesListFragment = document.createDocumentFragment();

function renderPictures(data) {
  data.forEach(({id, url, description, likes, comments}) => {
    const clonePictureElement = pictureTemplate.cloneNode(true);
    clonePictureElement.dataset.id = id;
    clonePictureElement.querySelector('img').src = url;
    clonePictureElement.querySelector('img').alt = description;
    clonePictureElement.querySelector('.picture__comments').textContent = comments.length;
    clonePictureElement.querySelector('.picture__likes').textContent = likes;
    picturesListFragment.append(clonePictureElement);
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
