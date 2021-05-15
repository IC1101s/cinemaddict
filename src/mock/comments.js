import {getRandomIntegerNumber, getRandomArrayItem} from "../utils.js";

const emojiImages = [
  `./images/emoji/smile.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`,
];

const texts = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const authors = [
  `Tim Macoveev`,
  `John Doe`,
  `Mark Edit`,
  `Elvis Star`,
];

const days = [
  `2019/12/31 23:59`,
  `2 days ago`,
  `Today`,
  `3 days ago`,
];

const names = [
  `sleeping`,
  `puke`,
  `angry`,
  `smile`,
];

const generateComment = () => {
  return {
  	emojiImage: getRandomArrayItem(emojiImages),
    text: getRandomArrayItem(texts),
    author: getRandomArrayItem(authors),
    day: getRandomArrayItem(days),
    name: getRandomArrayItem(names),
  };
};

const generateEmogi = () => {
  return {
    emojiImage: emojiImages,
    name: names,
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

const generateEmogis = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEmogi);
};
 
export {generateComment, generateComments, generateEmogi, generateEmogis};
