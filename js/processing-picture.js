import {isEscapeKey} from './util.js';
import {REGULAR_EXPRESSION_SPACE, REGULAR_EXPRESSION_HASHTAG, MAX_COUNT_HASHTAGS} from './const.js';
import {checkNumberHashtags} from './util.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadCancel = imgUploadForm.querySelector('#upload-cancel');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescriptiontags = imgUploadForm.querySelector('.text__description');
const btnSubmit = document.querySelector('.img-upload__submit');


const onImgUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeModalimgUpload();
  }
};

const onBtnImgUploadCancelClick = () => {
  closeModalimgUpload();
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

listenerEventTagClass(textDescriptiontags, removeEventListenerEscKeydown, addEventListenerEscKeydown);


imgUploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onImgUploadEscKeydown);
  imgUploadCancel.addEventListener('click', onBtnImgUploadCancelClick);
});

function closeModalimgUpload () {
  imgUploadOverlay.classList.add('hidden');
  imgUploadFile.value = '';
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
    btnSubmit.disabled = false;
    return true;
  } else {
    btnSubmit.disabled = true;
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

