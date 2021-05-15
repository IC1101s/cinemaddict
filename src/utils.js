const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

const getRandomArrayLength = (array) => {
  const randomIndex = Math.ceil(Math.random() * array.length);
  array.length = randomIndex;

  return array;
};

export {getRandomIntegerNumber, getRandomArrayItem, getRandomArrayLength};