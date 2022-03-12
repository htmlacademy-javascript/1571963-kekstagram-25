import {createPhotosDescriptions} from './data.js';
import {showModalWindow} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content;
const newItemPicturce = pictureTemplate.querySelector('.picture');
const itemPhotosDescriptions = createPhotosDescriptions();
const pictureListFragment = document.createDocumentFragment();
const pictureList = document.querySelector('.pictures');

itemPhotosDescriptions.forEach((picture) => {
  const copyItemPicture = newItemPicturce.cloneNode(true);
  copyItemPicture.querySelector('img').src = picture.url;
  copyItemPicture.querySelector('img').alt = picture.description;
  copyItemPicture.querySelector('.picture__likes').textContent = picture.likes;
  copyItemPicture.querySelector('.picture__comments').textContent = picture.comments.length;
  showModalWindow(copyItemPicture, picture);
  pictureListFragment.append(copyItemPicture);
});

pictureList.append(pictureListFragment);

