import { setUploadForm } from './form.js';
import { showGallery } from './gallery.js';
import { getData } from './api.js';
import { showErrorMessage } from './popup.js';

setUploadForm();
getData()
  .then((data) => {
    showGallery(data);
  })
  .catch(
    (err) => {
      showErrorMessage(err.message);
    }
  );
