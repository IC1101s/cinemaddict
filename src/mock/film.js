import {getRandomIntegerNumber, getRandomArrayItem, getRandomArrayLength, getRandomArrayLength_2} from "../utils/common.js";

const namesFilms = [
  `The Dance of Life`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `The Great Flamarion`,
  `Sagebrush Trail`,
  `Popeye Meets Sinbad`,
  `Made For Each Other`,
];

const postersFilms = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const descriptionsFilms = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget consectetur adipiscing elit consectetur adipiscing elit.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. In rutrum ac purus sit amet tempus tortor ac porta.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet Sedblandit, eros vel aliquam faucibus, puruse euismod diame. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. In rutrum ac purus sit amet tempus tortor ac porta. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. In rutrum ac purus sit amet tempus tortor ac porta. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. In rutrum ac purus sit amet tempus tortor ac porta.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. In rutrum ac purus sit amet tempus tortor ac porta. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. In rutrum ac purus sit amet tempus tortor ac porta.`,
];

const ratingsFilms = [
  `8.3`,
  `9.0`,
  `2.3`,
  `5.5`,
  `4.7`,
  `8.7`,
  `7.3`,
];

const yearsFilms = [
  `1955`,
  `1964`,
  `1929`,
  `1940`,
  `1967`,
  `1980`,
];

const durationsFilms = [
  `1h 36m`,
  `1h 55m`,
  `1h 59m`,
  `1h 21m`,
  `1h 30m`,
  `1h 50m`,
];

const genresFilms = [
  `Drama`,
  `Comedy`,
  `Fantasy`,
  `Romance`,
  `Musical`,
  `Mystery`,
  `Film-Noir`,
];

const directorsFilms = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Anthony Mann`,
];

const writersFilms = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Anthony Mann`,
  `Ilon Mask`,
];

const actorsFilms = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Richard Weil`,
  `Dan Duryea`,
  `Ilon Mask`,
  `Anthony Mann`,
];

const datesFilms = [
  `30 March`,
  `14 May`,
  `21 June`,
  `29 July`,
  `18 October`,
  `3 November`,
]; 

const countrysFilms = [
  `USA`,
  `Russia`,
  `France`,
  `Germany`,
  `Canada`,
];

const agesFilms = [
  `0`,
  `6`,
  `12`,
  `16`,
  `18`,
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

const emojiNameToImage = {
  smile: `./images/emoji/smile.png`,
  sleeping: `./images/emoji/sleeping.png`,
  puke: `./images/emoji/puke.png`,
  angry: `./images/emoji/angry.png`,
};

const generateFilm = () => {
  const genres = getRandomArrayLength_2(genresFilms);

  return {
    countComment: getRandomIntegerNumber(0, 4),
  	name: getRandomArrayItem(namesFilms),
    rating: getRandomArrayItem(ratingsFilms),
    year: getRandomArrayItem(yearsFilms),
    duration: getRandomArrayItem(durationsFilms),
    poster: getRandomArrayItem(postersFilms),
    description: getRandomArrayItem(descriptionsFilms),  
    director: getRandomArrayItem(directorsFilms),
    date: getRandomArrayItem(datesFilms),
    country: getRandomArrayItem(countrysFilms),
    age: getRandomArrayItem(agesFilms),
    writers: getRandomArrayLength(writersFilms).join(`, `),
    actors: getRandomArrayLength(actorsFilms).join(`, `), 
    genres: genres.join(` `),
    genre: genres[getRandomIntegerNumber(0, genres.length - 1)],
    isActiveWatchlist: Math.random() > 0.5,
    isActiveWatched: Math.random() > 0.5,
    isActiveFavorite: Math.random() > 0.5,
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

const generateComment = () => {
  const emojiImages = Object.values(emojiNameToImage);
  const names = Object.keys(emojiNameToImage);

  return {
    emojiImage: getRandomArrayItem(emojiImages),
    text: getRandomArrayItem(texts),
    author: getRandomArrayItem(authors),
    day: getRandomArrayItem(days),
    name: getRandomArrayItem(names)
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

const generateEmojis = () => {
  return {
    emojiNameToImage,
    isName: false,
  };
};

export {generateFilm, generateFilms, generateComments, generateEmojis};
