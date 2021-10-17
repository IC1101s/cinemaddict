export const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);
  
  return array[randomIndex];
};

export const getRandomArrayLength = (array) => {
  const maxRandomNumber = getRandomIntegerNumber(0, array.length - 2);
  const minRandomNumber = getRandomIntegerNumber(0, maxRandomNumber - 1);

  return array.slice(minRandomNumber, maxRandomNumber);
}; 

export const getRandomArrayLength2 = (array) => {
  const maxRandomNumber = getRandomIntegerNumber(2, array.length);
  const minRandomNumber = getRandomIntegerNumber(0, maxRandomNumber - 2);
  
  return array.slice(minRandomNumber, maxRandomNumber);
}; 
