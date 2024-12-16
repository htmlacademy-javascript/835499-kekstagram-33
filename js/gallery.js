import { DEFAULT_UNIQUE_NUMBERS, DEBOUNCE_TIME, FILTERS } from './init.js';
import { renderBigPicture } from './picture-modal.js';
import { debounce } from './utils.js';

let dataArray = [];
let currentFilter = FILTERS.DEFAULT;

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.firstElementChild;
const picturesListFragment = document.createDocumentFragment();
const filterContainerElement = document.querySelector('.img-filters');
const filterButtonElements = filterContainerElement.querySelectorAll('.img-filters__button');

const getFilter = (name) => {
  switch (name) {
    case FILTERS.RANDOM:
      return [...dataArray].sort(()=> Math.random() - 0.5).slice(0, DEFAULT_UNIQUE_NUMBERS);
    case FILTERS.DISCUSSED:
      return [...dataArray].sort((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length);
    default:
      return [...dataArray];
  }
};

const renderGallery = (data) => {
  picturesContainerElement.querySelectorAll('.picture').forEach((el) => el.remove());
  data.forEach(({id, url, description, likes, comments}) => {
    const newPicture = pictureTemplateElement.cloneNode(true);
    newPicture.dataset.id = id;
    newPicture.querySelector('img').src = url;
    newPicture.querySelector('img').alt = description;
    newPicture.querySelector('.picture__comments').textContent = comments.length;
    newPicture.querySelector('.picture__likes').textContent = likes;
    picturesListFragment.append(newPicture);
  });
  picturesContainerElement.append(picturesListFragment);

  picturesContainerElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      const pictureId = +evt.target.parentElement.getAttribute('data-id');
      const actionData = data.find((item) => item.id === pictureId);
      if (actionData) {
        renderBigPicture(actionData);
      }
    }
  });
};

const debounceRenderGallery = debounce(
  () => renderGallery(getFilter(currentFilter))
  , DEBOUNCE_TIME
);

const setFilterActive = (name) => {
  filterButtonElements.forEach((i) => {
    if (i.id !== name) {
      i.classList.remove('img-filters__button--active');
    } else {
      i.classList.add('img-filters__button--active');
    }
  });
};

const onFilterClick = (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    currentFilter = evt.target.id;
    debounceRenderGallery();
    setFilterActive(currentFilter);
  }
};

const renderFilters = () => {
  filterContainerElement.classList.remove('img-filters--inactive');
  filterContainerElement.addEventListener('click', onFilterClick);
};

const showGallery = (data) => {
  dataArray = [...data];
  renderGallery(getFilter(currentFilter));
  renderFilters();
  setFilterActive(currentFilter);
};

export { showGallery };
