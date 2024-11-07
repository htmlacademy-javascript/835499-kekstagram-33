import Init from './InitData.js';
import { createInfo } from './DataBuilder.js';
import { displayPictures } from './DisplayPictures.js';

function createData(value) {
  return Array.from({length: value}, createInfo);
}

const dataBase = createData(Init.QUANTITY);
// console.table(createData(Init.QUANTITY));
displayPictures(dataBase);
