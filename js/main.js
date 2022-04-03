import './util.js';
import {fillMainPage} from './picture.js';
import './big-picture.js';
import {setUserFormSubmit, closeModalImgUpload} from './processing-picture.js';
import './scale-image.js';
import './filter-image.js';
import {getData} from './api.js';

getData((pictures) => {
  fillMainPage(pictures);
});

setUserFormSubmit(closeModalImgUpload);
