// import {createPhotosDescriptions} from './data.js';
import {showModalWindow} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');

const fillMainPage = (miniatures) => {
  const pictureListFragment = document.createDocumentFragment();

  miniatures.forEach((picture) => {
    const copyItemPicture = pictureTemplate.cloneNode(true);
    copyItemPicture.querySelector('img').src = picture.url;
    copyItemPicture.querySelector('img').alt = picture.description;
    copyItemPicture.querySelector('.picture__likes').textContent = String(picture.likes);
    copyItemPicture.querySelector('.picture__comments').textContent = String (picture.comments.length);
    showModalWindow(copyItemPicture, picture);
    pictureListFragment.append(copyItemPicture);
  });

  pictureList.append(pictureListFragment);
};

export{fillMainPage};
