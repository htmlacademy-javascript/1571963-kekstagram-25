import {MESSAGE_SHOW_TIME} from './const.js';

//Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//Функция для проверки максимальной длины строки.
const checkStringLength = (stringTest, lengthMax) => stringTest.length >= lengthMax;

checkStringLength('Anton Rogulenko', 20);

//Функция для клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

//Функция для клавиши Enter
const isEnterKey = (evt) => evt.key === 'Enter';

//Функция создания имени тега и имени класса
const doElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

//Функция универсальная для проверки длинны массива
function checkNumberHashtags(array, count) {
  return array.length <= count;
}

//Функция вывода ошибки загрузки миниатюр
const showMessageError = (message) => {
  const messageContainer = document.createElement('div');
  messageContainer.style.color = 'red';
  messageContainer.style.fontWeight = 'bold';
  messageContainer.style.fontSize = 'x-large';
  messageContainer.style.textAlign = 'center';
  messageContainer.textContent = message;
  document.body.append(messageContainer);
  setTimeout(() => {
    messageContainer.remove();
  }, MESSAGE_SHOW_TIME);
};

export {getRandomInRange, isEscapeKey,isEnterKey, doElement, checkNumberHashtags, showMessageError};
