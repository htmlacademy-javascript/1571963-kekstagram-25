//Функция, возвращающая случайное целое число из переданного диапазона включительно. 
function getRandomInRange(min, max) {
  if (max < min) {
    console.log('Ошибка! Значение max меньше значения min, исправьте.');
  } else if (max <= min) {
    console.log('Значения в min и max не могут быть равными');
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

getRandomInRange(8, 6);

//Функция для проверки максимальной длины строки.
function checkStringlength(stringTest, lengthMax) {
  if (stringTest.length >= lengthMax) {
    return true;
  }
  return false;
}

let str = 'Какая-то а';

checkStringlength(str, 10);
