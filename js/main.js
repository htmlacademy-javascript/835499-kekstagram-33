import { galleryHandler } from './render-gallery.js';
import './upload-handler.js';
import { getData } from './api.js';
import { showErrorMessage } from './utils.js';
import { setUserFormSubmit } from './upload-handler.js';

// Тестовые данные
// import { createTestData } from './create-data.js';
// const dataBase = createTestData();
// galleryHandler(dataBase);

setUserFormSubmit();
getData()
  .then((data) => {
    galleryHandler(data);
  })
  .catch(
    (err) => {
      showErrorMessage(err.message);
    }
  );

