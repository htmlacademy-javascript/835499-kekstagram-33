// file validation
export const FILE_TYPES = ['png', 'jpg', 'jpeg'];

// form filter
export const EFFECT_DEFAULT = 'none';
export const EFFECTS = {
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
      max: 3,
      step: 0.1,
    },
  },
};

// form photo scale
export const SCALE_DEFAULT = 100;
export const SCALE_STEP = 25;
export const SCALE_MAX = 100;
export const SCALE_MIN = 25;
export const SCALE_RATIO = 0.01;

// form submit
export const SUBMIT_TEXT = {
  DEFAULT: 'Сохраняю...',
  SENDING: 'Опубликовать',
};

// form validation
export const MAX_HASHTAGS = 5;
export const MAX_DESCRIPTION = 140;
export const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
export const MESSAGES = {
  HASHTAG_ERROR: 'введён невалидный хэштег',
  HASHTAG_UNIQUE_ERROR: 'хэштеги повторяются',
  HASHTAG_QUANTITY_ERROR: 'превышено количество хэштегов',
  DESCRIPTION_ERROR: `длина комментария больше ${MAX_DESCRIPTION} символов`,
};

// form
export const ERROR_FILE_MESSAGE = 'Неверный тип файла';

// gallery
export const DEFAULT_UNIQUE_NUMBERS = 10;
export const DEBOUNCE_TIME = 500;
export const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

// picture modal
export const COMMENTS_COUNT = 5;
export const AVATAR_WIDTH = 35;
export const AVATAR_HEIGHT = 35;

// popup
export const POPUP_ERROR_TIME = 5000;
