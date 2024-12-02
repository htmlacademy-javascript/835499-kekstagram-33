import { initFiltersHandler } from './upload-form-photo-filters.js';

const SCALE_DEFAULT = 100;
const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;

const upScaleButton = document.querySelector('.scale__control--bigger');
const downScaleButton = document.querySelector('.scale__control--smaller');
const currentScaleElement = document.querySelector('.scale__control--value');
const previewImageElement = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelectorAll('.effects__item');

const state = {
  scale: SCALE_DEFAULT,
};

function resetImageSetting() {
  state.scale = SCALE_DEFAULT;
  previewImageElement.style.transform = `scale(${SCALE_DEFAULT * 0.01})`;
  currentScaleElement.value = `${SCALE_DEFAULT}%`;
  effectsList[0].children[0].checked = true;
}

function renderImage() {
  previewImageElement.style.transform = `scale(${state.scale * 0.01})`;
  currentScaleElement.value = `${state.scale}%`;
}

function setScaleUp() {
  if (state.scale + SCALE_STEP <= SCALE_MAX) {
    state.scale += SCALE_STEP;
  }
  renderImage();
}

function setScaleDown() {
  if (state.scale - SCALE_STEP >= SCALE_MIN) {
    state.scale -= SCALE_STEP;
  }
  renderImage();
}

function imageSettingHandler() {
  upScaleButton.addEventListener('click', setScaleUp);
  downScaleButton.addEventListener('click', setScaleDown);
  initFiltersHandler();
}


export { imageSettingHandler, resetImageSetting };
