import {getRandomArrayItem} from "../utils/common.js";

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

const date = [
  `2021-01-25T16:12:32.587Z`,
  `2021-04-17T23:02:30.512Z`,
  `2020-12-23T05:09:56.254Z`,
  `2021-10-17T09:32:21.005Z`,
  `2019-07-02T18:21:02.089Z`,
  `2021-10-17T19:13:21.005Z`,
  `2021-10-17T19:12:21.005Z`,
  `2021-10-17T19:10:21.005Z`,
];

const emojiNameToImage = {
  smile: `./images/emoji/smile.png`,
  sleeping: `./images/emoji/sleeping.png`,
  puke: `./images/emoji/puke.png`,
  angry: `./images/emoji/angry.png`,
};

const generateComment = () => {
  const emojiImages = Object.values(emojiNameToImage);
  const names = Object.keys(emojiNameToImage);

  return {
    emojiImage: getRandomArrayItem(emojiImages),
    name: getRandomArrayItem(names),
    text: getRandomArrayItem(texts),
    author: getRandomArrayItem(authors),
    date: getRandomArrayItem(date),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
