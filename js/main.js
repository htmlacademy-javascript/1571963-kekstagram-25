//Функция, возвращающая случайное целое число из переданного диапазона включительно.
function getRandomInRange(min, max) {
  if (max <= min) {
    throw new Error('Ошибка!Максимальное число меньше или равно минимальному');
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

getRandomInRange(1, 10);

//Функция для проверки максимальной длины строки.
function checkStringLength(stringTest, lengthMax) {
  return stringTest.length >= lengthMax;
}

checkStringLength('Hello World', 20);
