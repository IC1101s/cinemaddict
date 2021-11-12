import {getRandomArrayItem} from "../utils/common.js";

const texts = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `Very good!`,
  `Interesting movie`,
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
  `2021-11-11T20:10:21.005Z`,
];

const emojis = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const generateComment = () => {
  return {
    id: String(new Date() + Math.random()),
    text: getRandomArrayItem(texts),
    author: getRandomArrayItem(authors),
    date: getRandomArrayItem(date),
    emoji: getRandomArrayItem(emojis),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
