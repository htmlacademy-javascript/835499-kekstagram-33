import { FILE_TYPES } from './init.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileElement = uploadFormElement.querySelector('#upload-file');

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((item) => fileName.endsWith(item));
};

const isFileValid = () => {
  const file = uploadFileElement.files[0];
  return file && isValidType(file);
};

export { isFileValid };
