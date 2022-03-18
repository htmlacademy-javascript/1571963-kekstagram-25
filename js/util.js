//Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//Функция для проверки максимальной длины строки.
const checkStringLength = (stringTest, lengthMax) => stringTest.length >= lengthMax;

checkStringLength('Anton Rogulenko', 20);

const getRandomArrayElement = (elements) => elements[getRandomInRange(0, elements.length - 1)];

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

export {getRandomInRange, getRandomArrayElement, isEscapeKey,isEnterKey, doElement, checkNumberHashtags};
