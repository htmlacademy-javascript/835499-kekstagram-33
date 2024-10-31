import { Init } from './InitData.js';
import { createPhotoInfo } from './DataBuilder.js';

function createData(value) {
  return Array.from({length: value}, createPhotoInfo);
}

createData(Init.VALUES_QUANTITY);
// console.table(createData(Init.VALUES_QUANTITY));
