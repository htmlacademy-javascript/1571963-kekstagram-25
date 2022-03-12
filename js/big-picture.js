import {isEscapeKey, doElement} from './util.js';
import {WIDTH_VALUE_AVATAR, HEIGHT_VALUE_AVATAR} from './const.js';

const openModalWindow = document.querySelector('.big-picture');
const hideCommentCounter = openModalWindow.querySelector('.social__comment-count');
const hideCommentLoader = openModalWindow.querySelector('.comments-loader');
const cancelModalWindow = openModalWindow.querySelector('.big-picture__cancel');
const bigImg = openModalWindow.querySelector('.big-picture__img');
const likesCount = openModalWindow.querySelector('.likes-count');
const commentsCount = openModalWindow.querySelector ('.comments-count');
const socialComments = openModalWindow.querySelector('.social__comments');

const createComment = () => {
  const comment = doElement('li', 'social__comment');
  const avatar = doElement('img', 'social__picture');
  avatar.style.width = WIDTH_VALUE_AVATAR;
  avatar.style.heght = HEIGHT_VALUE_AVATAR;
  comment.append(avatar);
  const commentText = doElement('p', 'social__text');
  comment.append(commentText);
  return comment;
};

const showModalWindow = (previewElement, imageElement) => {
  previewElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openModalWindow.classList.remove('hidden');
    hideCommentCounter.classList.add('hidden');
    hideCommentLoader.classList.add('hidden');
    document.body.classList.add('modal-open');
    bigImg.querySelector('img').src = imageElement.url;
    bigImg.querySelector('img').alt = imageElement.alt;
    likesCount.textContent = imageElement.likes;
    commentsCount.textContent = imageElement.comments.length;
    for(let i = 0 ; i < imageElement.comments.length; i++){
      const newComment = createComment();
      newComment.querySelector('img').src = imageElement.comments[i].avatar;
      newComment.querySelector('img').alt = imageElement.comments[i].name;
      newComment.querySelector('p').textContent = imageElement.comments[i].message;
      socialComments.append(newComment);
    }
    document.addEventListener('keydown', (event) => {
      if (isEscapeKey(event)) {
        evt.preventDefault();
        openModalWindow.classList.add('hidden');
        document.body.classList.remove('modal-open');
      }
    });
  });
};

cancelModalWindow.addEventListener('click', (evt) => {
  evt.preventDefault();
  openModalWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

export {showModalWindow};
