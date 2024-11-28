import Init from './init-values.js';
import { createInfo } from './create-data.js';
import { renderPictures } from './render-gallery.js';
import './upload-form-handler.js';

function createData(value) {
  return Array.from({length: value}, createInfo);
}

const dataBase = createData(Init.QUANTITY);
// console.table(createData(Init.QUANTITY));
// console.table(dataBase);
renderPictures(dataBase);

