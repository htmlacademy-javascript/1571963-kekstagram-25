import {isEscapeKey, isEnterKey} from './util.js';
import {createComments} from './create-comments.js';
import {START_ARRAY_COMMENT, END_ARRAY_COMMENT} from './const.js';

const openModalWindow = document.querySelector('.big-picture');
const hideCommentLoader = openModalWindow.querySelector('.comments-loader');
const cancelModalWindow = openModalWindow.querySelector('.big-picture__cancel');
const bigImg = openModalWindow.querySelector('.big-picture__img');
const likesCount = openModalWindow.querySelector('.likes-count');
const commentsCount = openModalWindow.querySelector ('.comments-count');
const socialComments = openModalWindow.querySelector('.social__comments');
const commentNumber = openModalWindow.querySelector('.comment-number');


const onOpenModalWindowEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeModalWindow();
  }
};

const onOpenModalWindowEnterKeydown = (evt) => {
  if (isEnterKey(evt)) {
    closeModalWindow();
  }
};

const onButtonOpenModalCancelClick = () => {
  closeModalWindow();
};

function closeModalWindow (){
  document.removeEventListener('keydown', onOpenModalWindowEscKeydown);
  document.removeEventListener('keyup', onOpenModalWindowEnterKeydown);
  openModalWindow.classList.add('hidden');
  commentsCount.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  socialComments.innerHTML='';
  hideCommentLoader.classList.remove('hidden');
}

const showModalWindow = (previewElement, imageElement) => {
  previewElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openModalWindow.classList.remove('hidden');

    document.addEventListener('keydown', onOpenModalWindowEscKeydown);
    document.addEventListener('keyup', onOpenModalWindowEnterKeydown);
    cancelModalWindow.addEventListener('click', onButtonOpenModalCancelClick);

    document.body.classList.add('modal-open');

    bigImg.querySelector('img').src = imageElement.url;
    bigImg.querySelector('img').alt = imageElement.alt;
    likesCount.textContent = String(imageElement.likes);
    commentsCount.textContent = String(imageElement.comments.length);
    const arrayComments = imageElement.comments.slice(START_ARRAY_COMMENT);
    let array = arrayComments.splice(START_ARRAY_COMMENT, END_ARRAY_COMMENT);
    let count = array.length;
    commentNumber.textContent = String(count);
    hideCommentLoader.addEventListener('click', () => {
      array = arrayComments.splice(START_ARRAY_COMMENT, END_ARRAY_COMMENT);
      createComments(array, socialComments);
      if(array.length === START_ARRAY_COMMENT){
        hideCommentLoader.classList.add('hidden');
      }
      count += array.length;
      commentNumber.textContent = String(count);
    });
    createComments(array, socialComments);
  });
};

export {showModalWindow};
