import {doElement} from './util.js';
import {WIDTH_VALUE_AVATAR, HEIGHT_VALUE_AVATAR} from './const.js';

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

const createComments = (array, container) => {
  for(let i = 0 ; i < array.length; i++){
    const newComment = createComment();
    newComment.querySelector('img').src = array[i].avatar;
    newComment.querySelector('img').alt = array[i].name;
    newComment.querySelector('p').textContent = array[i].message;
    container.append(newComment);
  }
};

export {createComments};

