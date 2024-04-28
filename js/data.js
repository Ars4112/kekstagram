export function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const lengthArray = 25;

const idSet = new Set();
const urlSet = new Set();

const createsUniqueArray = (array, num) => {
  while (array.size !== num) {
    array.add(getRandomPositiveInteger(1, num));
  }
  return array;
};

createsUniqueArray(idSet, lengthArray);
createsUniqueArray(urlSet, lengthArray);

export const urlArray = Array.from(urlSet);
// const idArray = () => Array.from(idSet);

export const description = [
  'описание-1',
  'описание-2',
  'описание-3',
  'описание-4',
  'описание-5',
  'описание-6',
  'описание-7',
  'описание-8',
  'описание-9',
  'описание-10',
];

const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const name = [
  'Артем',
  'Сергей',
  'Денис',
  'Вера',
  'Артур',
  'Инна',
  'Вероника',
  'Александр',
  'Ирина',
];

const lastName = [
  'Иванов',
  'Петров',
  'Сидоров',
  'Липин',
  'Мартынова',
  'Дони',
  'Гафетдинов',
];

const getElementFromArray = (element) =>
  element[getRandomPositiveInteger(0, element.length - 1)];

const getUniqueId = (index) => {
  const uniqueId = Array.from(createsUniqueArray(idSet, 200));
  return uniqueId[index];
};

const comments = () => ({
  id: getUniqueId(getRandomPositiveInteger(0, 200)),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: `${getElementFromArray(message)}`,
  name: `${getElementFromArray(name)} ${getElementFromArray(lastName)}`,
});

export const createCommentsArray = () =>
  Array.from({ length: getRandomPositiveInteger(5, 30) }, comments);


