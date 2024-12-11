const SCALE_DEFAULT = 100;
const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;

const upScaleButton = document.querySelector('.scale__control--bigger');
const downScaleButton = document.querySelector('.scale__control--smaller');
const currentScaleElement = document.querySelector('.scale__control--value');
const previewImageElement = document.querySelector('.img-upload__preview img');

const state = {
  scale: SCALE_DEFAULT,
};

function resetImageScale() {
  state.scale = SCALE_DEFAULT;
  previewImageElement.style.transform = `scale(${SCALE_DEFAULT * 0.01})`;
  currentScaleElement.attributes.value.textContent = `${SCALE_DEFAULT}%`;
  currentScaleElement.value = `${SCALE_DEFAULT}%`;
}

function renderImage() {
  previewImageElement.style.transform = `scale(${state.scale * 0.01})`;
  currentScaleElement.attributes.value.textContent = `${state.scale}%`;
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

function initScaleHandler() {
  upScaleButton.addEventListener('click', setScaleUp);
  downScaleButton.addEventListener('click', setScaleDown);
}

export { initScaleHandler, resetImageScale };
