import { isEscapeKey } from './utils.js';

function closeNotification(evt) {
  evt.stopPropagation();
  const currentElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = currentElement.querySelector('button');
  if (evt.target === currentElement || evt.target === closeButton || isEscapeKey(evt)) {
    currentElement.remove();
    document.body.removeEventListener('click', closeNotification);
    document.body.removeEventListener('keydown', closeNotification);
  }
}

function appendNotification (template) {
  const notificationNode = template.cloneNode(true);
  document.body.append(notificationNode);
  document.body.addEventListener('click', closeNotification);
  document.body.addEventListener('keydown', closeNotification);
}

export { appendNotification, closeNotification };
