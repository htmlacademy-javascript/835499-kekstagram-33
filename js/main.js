// import Init from './init-values.js';
// import { createInfo } from './create-data.js';
import { renderPictures } from './render-gallery.js';
import './upload-form-handler.js';
import { getData } from './api.js';
import { showErrorMessage } from './utils.js';

// function createData(value) {
//   return Array.from({length: value}, createInfo);
// }
// const dataBase = createData(Init.QUANTITY);
// renderPictures(dataBase);

getData()
  .then((data) => {
    renderPictures(data);
  })
  .catch(
    (err) => {
      showErrorMessage(err.message);
    }
  );

