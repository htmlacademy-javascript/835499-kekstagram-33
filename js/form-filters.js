import { EFFECT_DEFAULT, EFFECTS } from './init.js';

const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainerElement.querySelector('.effect-level__slider');
const sliderInputElement = sliderContainerElement.querySelector('.effect-level__value');
const effectListElement = document.querySelector('.effects__list');
const effectItemElements = document.querySelectorAll('.effects__item');
const previewImageElement = document.querySelector('.img-upload__preview img');

let filterActive = EFFECT_DEFAULT;

const isDefault = () => filterActive === EFFECT_DEFAULT;

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const setImageStyles = () => {
  if (isDefault()) {
    previewImageElement.style.filter = null;
    return;
  }
  const { value } = sliderInputElement;
  const { name, units } = EFFECTS[filterActive];
  previewImageElement.style.filter = `${name}(${value}${units})`;
};

const sliderUpdateHandler = () => {
  sliderInputElement.value = sliderElement.noUiSlider.get();
  setImageStyles();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });
  sliderElement.noUiSlider.on('update', sliderUpdateHandler);
  hideSlider();
};

const updateSlider = ({ min, max, step }) => {
  sliderElement.noUiSlider.updateOptions({
    step: step,
    range: { min: min, max: max },
    start: max,
  });
};

const setSlider = () => {
  updateSlider(EFFECTS[filterActive].config);
  showSlider();
  if (isDefault()) {
    hideSlider();
  }
};

const startFilterHandler = (evt) => {
  filterActive = evt.target.value;
  setSlider();
  setImageStyles();
};

const setFilters = () => {
  createSlider(EFFECTS[EFFECT_DEFAULT].config);
  effectListElement.addEventListener('change', startFilterHandler);
};

const removeFilters = () => {
  effectItemElements[0].children[0].checked = true;
  effectListElement.removeEventListener('change', startFilterHandler);
  sliderElement.noUiSlider?.destroy();
};

export { setFilters, removeFilters };
