import Init from './InitData.js';
import { createInfo } from './DataBuilder.js';
import { renderPictures } from './RenderPictures.js';
// import { renderBigImage } from './renderBigImage.js';

function createData(value) {
  return Array.from({length: value}, createInfo);
}

const dataBase = createData(Init.QUANTITY);
// console.table(createData(Init.QUANTITY));
// console.table(dataBase);
renderPictures(dataBase);

