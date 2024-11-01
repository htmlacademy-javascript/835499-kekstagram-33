import Init from './InitData.js';
import { createInfo } from './DataBuilder.js';

function createData(value) {
  return Array.from({length: value}, createInfo);
}

createData(Init.QUANTITY);
// console.table(createData(Init.QUANTITY));
