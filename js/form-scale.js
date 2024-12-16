import { SCALE_DEFAULT, SCALE_STEP, SCALE_MAX, SCALE_MIN, SCALE_RATIO } from './init.js';

const state = {
  scale: SCALE_DEFAULT,
};

const buttonUpElement = document.querySelector('.scale__control--bigger');
const buttonDownElement = document.querySelector('.scale__control--smaller');
const currentScaleElement = document.querySelector('.scale__control--value');
const previewImageElement = document.querySelector('.img-upload__preview img');

const renderImage = () => {
  previewImageElement.style.transform = `scale(${state.scale * SCALE_RATIO})`;
  currentScaleElement.attributes.value.textContent = `${state.scale}%`;
  currentScaleElement.value = `${state.scale}%`;
};

const onButtonUpClick = () => {
  if (state.scale + SCALE_STEP <= SCALE_MAX) {
    state.scale += SCALE_STEP;
  }
  renderImage();
};

const onButtonDownClick = () => {
  if (state.scale - SCALE_STEP >= SCALE_MIN) {
    state.scale -= SCALE_STEP;
  }
  renderImage();
};

const setScaleDefault = () => {
  state.scale = SCALE_DEFAULT;
  previewImageElement.style.transform = `scale(${SCALE_DEFAULT * SCALE_RATIO})`;
  currentScaleElement.value = `${SCALE_DEFAULT}%`;
};

const setScale = () => {
  setScaleDefault();
  buttonUpElement.addEventListener('click', onButtonUpClick);
  buttonDownElement.addEventListener('click', onButtonDownClick);
};

const removeScale = () => {
  state.scale = SCALE_DEFAULT;
  previewImageElement.style.transform = `scale(${SCALE_DEFAULT * SCALE_RATIO})`;
  currentScaleElement.value = `${SCALE_DEFAULT}%`;
  buttonUpElement.removeEventListener('click', onButtonUpClick);
  buttonDownElement.removeEventListener('click', onButtonDownClick);
};

export { setScale, removeScale };
