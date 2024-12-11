// import Init from './init-values.js';
// import { createInfo } from './create-data.js';
import { galleryHandler } from './render-gallery.js';
import './upload-form-handler.js';
import { getData } from './api.js';
import { showErrorMessage } from './utils.js';
import { setUserFormSubmit } from './upload-form-handler.js';

// function createData(value) {
//   return Array.from({length: value}, createInfo);
// }
// const dataBase = createData(Init.QUANTITY);
// galleryHandler(dataBase);

getData()
  .then((data) => {
    galleryHandler(data);
    setUserFormSubmit();
  })
  .catch(
    (err) => {
      showErrorMessage(err.message);
    }
  );

