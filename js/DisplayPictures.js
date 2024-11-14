const picturesContainer = document.querySelector('.pictures').firstElementChild;
const pictureTemplate = document.querySelector('#picture').content.firstElementChild;
const picturesListFragment = document.createDocumentFragment();

function displayPictures(data) {
  data.forEach(({url, description, likes, comments}) => {
    const clonePictureElement = pictureTemplate.cloneNode(true);
    clonePictureElement.querySelector('img').src = url;
    clonePictureElement.querySelector('img').alt = description;
    clonePictureElement.querySelector('.picture__comments').textContent = comments.length;
    clonePictureElement.querySelector('.picture__likes').textContent = likes;
    picturesListFragment.append(clonePictureElement);
  });
  picturesContainer.after(picturesListFragment);
}

export { displayPictures };
