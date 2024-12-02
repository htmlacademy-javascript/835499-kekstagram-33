const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const filtersList = document.querySelector('.effects__list');
const previewImageElement = document.querySelector('.img-upload__preview img');

const FILTER_DEFAULT = 'none';
const FILTERS = {
  none: {
    name: 'none',
    units: '',
    config: {
      min: 1,
      max: 2,
      step: 0.1,
    },
  },
  chrome: {
    name: 'grayscale',
    units: '',
    config: {
      min: 0,
      max: 1,
      step: 0.1,
    },
  },
  sepia: {
    name: 'sepia',
    units: '',
    config: {
      min: 0,
      max: 1,
      step: 0.1,
    },
  },
  marvin: {
    name: 'invert',
    units: '%',
    config: {
      min: 0,
      max: 100,
      step: 1,
    },
  },
  phobos: {
    name: 'blur',
    units: 'px',
    config: {
      min: 0,
      max: 3,
      step: 0.1,
    },
  },
  heat: {
    name: 'brightness',
    units: '',
    config: {
      min: 1,
      max: 2,
      step: 0.1,
    },
  },
};

let filterActive = FILTER_DEFAULT;

function isDefault() {
  return filterActive === FILTER_DEFAULT;
}

function showSlider() {
  sliderContainer.classList.remove('hidden');
}

function hideSlider() {
  sliderContainer.classList.add('hidden');
}

function setImageStyles() {
  if (isDefault()) {
    previewImageElement.style.filter = null;
    return;
  }
  const { value } = sliderValue;
  const { name, units } = FILTERS[filterActive];
  previewImageElement.style.filter = `${name}(${value}${units})`;
}

function sliderUpdateHandler() {
  sliderValue.value = slider.noUiSlider.get();
  setImageStyles();
}

function createSlider({ min, max, step }) {
  noUiSlider.create(slider, {
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
  slider.noUiSlider.on('update', sliderUpdateHandler);
  hideSlider();
}

function updateSlider({ min, max, step }) {
  slider.noUiSlider.updateOptions({
    step: step,
    range: { min: min, max: max },
    start: max,
  });
}

function setSlider() {
  if (isDefault()) {
    hideSlider();
    return;
  }
  updateSlider(FILTERS[filterActive].config);
  showSlider();
}

function setFilter(filter) {
  filterActive = filter;
  setSlider();
  setImageStyles();
}

function startFilterHandler(evt) {
  setFilter(evt.target.value);
}

function initFiltersHandler() {
  createSlider(FILTERS[FILTER_DEFAULT].config);
  filtersList.addEventListener('change', startFilterHandler);
}


function resetFilters() {
  setFilter(FILTERS[FILTER_DEFAULT]);
}

function resetFiltersHandler() {
  resetFilters();
  slider.noUiSlider.destroy();
  filtersList.removeEventListener('change', startFilterHandler);
}


export { initFiltersHandler, resetFiltersHandler };


