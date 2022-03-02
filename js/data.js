import {getRandomInRange, getRandomArrayElement} from './util.js';

const NUMBER_OBJECTS = 25;
const NUMBER_COMMENTS = 5;
const INITIAL_VALUE_AVATAR = 1;
const END_VALUE_AVATAR = 16;
const INITIAL_VALUE_LIKES = 15;
const END_VALUE_LIKES = 200;

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


let identifierDescription = 0; // для идентификатора фотокарточки
let identifierComment = 0; // для идентификатора комментария
const createCommentsPhoto = () => {
  const randomAvatarIndex = getRandomInRange(INITIAL_VALUE_AVATAR, END_VALUE_AVATAR);
  identifierComment++;
  return {
    id: identifierComment,
    avatar: `img/avatar-${randomAvatarIndex}.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhotosDescription = () => {
  identifierDescription++;
  return {
    id: identifierDescription,
    url: `photos/${identifierDescription}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInRange(INITIAL_VALUE_LIKES, END_VALUE_LIKES),
    comments: Array.from({length: getRandomInRange(1, NUMBER_COMMENTS)}, createCommentsPhoto),
  };
};

const createPhotosDescriptions = () => Array.from({length: NUMBER_OBJECTS}, createPhotosDescription);

export {createPhotosDescriptions};
