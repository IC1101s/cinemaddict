export const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);
  
  return array[randomIndex];
};

export const getRandomArrayLength = (array) => {
  return array.slice(0, getRandomIntegerNumber(2, array.length));
}; 

export const getRandomArrayLength_2 = (array) => {
  return array.slice(getRandomIntegerNumber(0, array.length - 1));
}; 
