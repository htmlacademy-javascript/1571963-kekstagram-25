import {isEscapeKey} from './util.js';
import {REGULAR_EXPRESSION_SPACE, REGULAR_EXPRESSION_HASHTAG, MAX_COUNT_HASHTAGS, MAX_PERCENTAGE_VALUE, DIVISION_ONE_HUNDRED} from './const.js';
import {checkNumberHashtags} from './util.js';
import {sendData} from './api.js';
import {scaleInput, effectLevelValue, effectImageNoneElement} from './filter-image.js';
import {imagePreviewElement} from './scale-image.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadCancel = imgUploadForm.querySelector('#upload-cancel');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescriptionTags = imgUploadForm.querySelector('.text__description');
const buttonSubmit = document.querySelector('.img-upload__submit');


//Скрытие блока редактирования по нажатию Esc
const onImgUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt) && evt.target !== textHashtags && evt.target !== textDescriptionTags) {
    closeModalImgUpload();
  }
};

const onBtnImgUploadCancelClick = () => {
  closeModalImgUpload();
};

function removeEventListenerEscKeydown () {
  document.removeEventListener('keydown', onImgUploadEscKeydown);
}

function addEventListenerEscKeydown () {
  document.addEventListener('keydown', onImgUploadEscKeydown);
}

function listenerEventTagClass (nameTagClass, removeEvt, addEvt) {
  nameTagClass.addEventListener('focus', removeEvt);
  nameTagClass.addEventListener('blur', addEvt);
}

listenerEventTagClass(textHashtags, removeEventListenerEscKeydown, addEventListenerEscKeydown);

listenerEventTagClass(textDescriptionTags, removeEventListenerEscKeydown, addEventListenerEscKeydown);


imgUploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onImgUploadEscKeydown);
  imgUploadCancel.addEventListener('click', onBtnImgUploadCancelClick);
});

// закрытие окна и сбрасывание введённые пользователем данных.
function closeModalImgUpload () {
  imgUploadOverlay.classList.add('hidden');
  imgUploadFile.value = '';
  textDescriptionTags.value = '';
  textHashtags.value = '';
  imagePreviewElement.style.filter = 'none';
  imagePreviewElement.style.transform = `scale(${MAX_PERCENTAGE_VALUE / DIVISION_ONE_HUNDRED})`;
  scaleInput.value = `${MAX_PERCENTAGE_VALUE}%`;
  effectLevelValue.style.visibility = 'hidden';
  effectImageNoneElement.checked = true;
  document.body.classList.remove('modal-open');
  removeEventListenerEscKeydown();
  imgUploadCancel.removeEventListener('click', onBtnImgUploadCancelClick);
}

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text__error-text',
  errorTextTag: 'span'
});

pristine.addValidator(textHashtags, validateHashtags);

function validateHashtags(stringHashtags) {
  if (!stringHashtags) {
    return true;
  }

  stringHashtags = stringHashtags.replace(/\s+/g, ' ').trim();
  const stringLowerCase = stringHashtags.toLowerCase();

  const wordsHashtags = stringLowerCase.split(REGULAR_EXPRESSION_SPACE);
  if (checkNumberHashtags(wordsHashtags, MAX_COUNT_HASHTAGS) && checkUniversalHashtags(wordsHashtags)&& checkValidateHashtag(wordsHashtags))
  {
    buttonSubmit.disabled = false;
    return true;
  } else {
    buttonSubmit.disabled = true;
    return false;
  }
}

function checkUniversalHashtags(array) {
  let isValid = true;
  for (let i = 0; i < array.length - 1; ++i) {
    isValid = array.indexOf(array[i], i + 1) < 0;
    if (!isValid) {
      return isValid;
    }
  }
  return isValid;
}

function checkValidateHashtag(array) {
  let isValid = true;
  array.forEach((hashtag) => {
    isValid = REGULAR_EXPRESSION_HASHTAG.test(hashtag);
    if (!isValid) {
      return isValid;
    }
  });
  return isValid;
}

//Показ информационного окна после успешной/неудачной отправки формы
function showResultMessage (message) {
  const messageTemplate = document.querySelector(`#${message}`)
    .content
    .querySelector(`.${message}`);
  const messageElement = messageTemplate.cloneNode(true);
  document.body.append(messageElement);
  const elementButton = messageElement.querySelector(`.${message}__button`);
  window.addEventListener('click', (evt) => onWindowClick(evt, message, messageElement));
  document.addEventListener('keydown', (evt) => onResultMessageEscPress(evt, messageElement), {once: true});
  elementButton.addEventListener('click', () => onResultCloseClick(messageElement), {once: true});
}

//Закрытие окна по клику на кнопке
function onResultCloseClick (messageElement) {
  messageElement.remove();
}

//Закрытие окна клавишей ESC
function onResultMessageEscPress (evt, messageElement) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onResultCloseClick(messageElement);
  }
}

//Закрытие окна по клику вне его области
function onWindowClick (evt, message, messageElement) {
  if (!evt.target.closest(`.${message}__inner`)) {
    onResultCloseClick(messageElement);
    window.removeEventListener('click', () => onWindowClick(evt, message, messageElement));
  }
}

const blockSubmitButton = (button) => {
  button.disabled = true;
  button.textContent = 'Публикация...';
};

const unblockSubmitButton = (button) => {
  button.disabled = false;
  button.textContent = 'Опубликовать';
};

// Функция отправки формы
const setUserFormSubmit = (onSucces) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton(buttonSubmit);
      sendData(
        () => {
          onSucces();
          unblockSubmitButton(buttonSubmit);
          showResultMessage('success');
        },
        () => {
          onSucces();
          unblockSubmitButton(buttonSubmit);
          showResultMessage('error');
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit, closeModalImgUpload};
