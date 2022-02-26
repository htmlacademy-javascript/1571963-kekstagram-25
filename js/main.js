//Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//Функция для проверки максимальной длины строки.
const checkStringLength = (stringTest, lengthMax) => stringTest.length >= lengthMax;

checkStringLength('Anton Rogulenko', 20);

const NUMBER_OBJECTS = 25;

const NAMES = [
  'Уилли',
  'Зорба',
  'Робсон',
  'Фёдор',
  'Самойло',
  'Адексей',
  'Амнат',
  'Маи',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !',
];

const DESCRIPTIONS = [
  'Нависшие веки',
  'Полосатые свитера',
  'Пост-рок',
  'Долго смотрит в потолок перед сном',
  'Стопка неотправленных писем',
  'Чёрное пальто до колен',
  'Банки от газировки',
];

const getRandomArrayElement = (elements) => elements[getRandomInRange(0, elements.length - 1)];

let identifierDescription = 0; // для идентификатора

function createCommentsPhoto() {
  const randomAvatarIndex = String(getRandomInRange(1, 6));
  return {
    id: identifierDescription,
    avatar: 'img/avatar-' + randomAvatarIndex + '.svg', // не знаю как это исправить, ругается что неожиданная конкатенация;
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAMES),
  };
}

function createPhotosDescription() {
  identifierDescription++;
  return {
    id: identifierDescription,
    url: 'photos/' + identifierDescription + '.jpg', // не знаю как это исправить, ругается что неожиданная конкатенация;
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInRange(15, 200),
    comments: createCommentsPhoto(),
  };
}

const newArrayPhotos = Array.from({
  length: NUMBER_OBJECTS
}, createPhotosDescription);

throw newArrayPhotos; //создал по причине того что при проверке newArrayPhotos не инициализирована;
