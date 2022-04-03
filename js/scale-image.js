import {SCALE_STEP} from './const.js';
import {DECIMAL_SYSTEM, DIVISION_ONE_HUNDRED, MAX_PERCENTAGE_VALUE, MIN_PERCENTAGE_VALUE} from './const.js';

const imagePreviewElement = document.querySelector('.img-upload__preview img');

const rangeInput = document.querySelector('.scale__control--value');

const buttonRangeBigger = document.querySelector('.scale__control--bigger');
const buttonRangeSmaller = document.querySelector('.scale__control--smaller');

buttonRangeBigger.addEventListener('click', () => {
  let scale = parseInt(rangeInput.value, DECIMAL_SYSTEM);
  if(!(scale >= MAX_PERCENTAGE_VALUE)){
    scale = scale + SCALE_STEP;
    rangeInput.value = `${scale}%`;
    imagePreviewElement.style.transform = `scale(${scale / DIVISION_ONE_HUNDRED})`;
  }
});

buttonRangeSmaller.addEventListener('click', () => {
  let scale = parseInt(rangeInput.value, DECIMAL_SYSTEM);
  if(!(scale <= MIN_PERCENTAGE_VALUE)){
    scale = scale - SCALE_STEP;
    rangeInput.value = `${scale}%`;
    imagePreviewElement.style.transform = `scale(${scale / DIVISION_ONE_HUNDRED})`;
  }
});

export {imagePreviewElement};
