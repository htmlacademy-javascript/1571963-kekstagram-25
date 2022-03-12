//Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//Функция для проверки максимальной длины строки.
const checkStringLength = (stringTest, lengthMax) => stringTest.length >= lengthMax;

checkStringLength('Anton Rogulenko', 20);

const getRandomArrayElement = (elements) => elements[getRandomInRange(0, elements.length - 1)];

//Функция для клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

//Функция создания имени тега и имени класса
const doElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

export {getRandomInRange, getRandomArrayElement, isEscapeKey, doElement};
