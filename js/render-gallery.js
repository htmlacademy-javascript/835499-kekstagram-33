import { renderBigPicture } from './render-picture.js';
import { debounce } from './utils.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.firstElementChild;
const picturesListFragment = document.createDocumentFragment();
const filterContainer = document.querySelector('.img-filters');
const filterButtons = filterContainer.querySelectorAll('.img-filters__button');

const DEFAULT_UNIQUE_NUMBERS = 10;
const DEBOUNCE_TIME = 500;
const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let dataArray = [];
let currentFilter = FILTERS.DEFAULT;

const debounceRenderGallery = debounce(
  () => renderGallery(getFilter(currentFilter))
  , DEBOUNCE_TIME
);

function getFilter(name) {
  switch (name) {
    case FILTERS.RANDOM:
      return [...dataArray].sort(()=> Math.random() - 0.5).slice(0, DEFAULT_UNIQUE_NUMBERS);
    case FILTERS.DISCUSSED:
      return [...dataArray].sort((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length);
    default:
      return [...dataArray];
  }
}

function setFilterActive(name) {
  filterButtons.forEach((i) => {
    if (i.id !== name) {
      i.classList.remove('img-filters__button--active');
    } else {
      i.classList.add('img-filters__button--active');
    }
  });
}

function filterEventHandler(evt) {
  if (evt.target.classList.contains('img-filters__button')) {
    currentFilter = evt.target.id;
    debounceRenderGallery();
    setFilterActive(currentFilter);
  }
}

function renderFilters() {
  filterContainer.classList.remove('img-filters--inactive');
  filterContainer.addEventListener('click', filterEventHandler);
}

function renderGallery(data) {
  picturesContainer.querySelectorAll('.picture').forEach((el) => el.remove());
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

function galleryHandler(data) {
  dataArray = [...data];
  // renderGallery(getFilter(currentFilter));
  debounceRenderGallery();
  renderFilters();
  setFilterActive(currentFilter);
}

export { galleryHandler };
