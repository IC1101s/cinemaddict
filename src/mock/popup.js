import {getRandomIntegerNumber, getRandomArrayItem, getRandomArrayLength} from "../utils/common.js";
import {generateFilm} from "../mock/film.js"

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
];

const actorsFilms = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Richard Weil`,
  `Dan Duryea`,
  `Richard Weil`,
  `Anthony Mann`,
];

const datesFilms = [
  `30 March 1945`,
  `14 May 1986`,
  `21 June 1949`,
  `29 July 1981`,
  `18 October 1953`,
  `3 November 1998`,
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

const generatePopupFilm = () => {
  const generateCopy = Object.assign({}, generateFilm());
  const {
    name, 
    rating, 
    duration, 
    poster, 
    description, 
    commentCount,
    isActiveWatchlist,
    isActiveWatched,
    isActiveFavorite
  } = generateCopy;

  return {
    poster,
  	name,
    rating,
    duration,
    description,
    commentCount,
    isActiveWatchlist,
    isActiveWatched,
    isActiveFavorite,
    director: getRandomArrayItem(directorsFilms),
    writers: getRandomArrayLength(writersFilms).join(`, `),
    actors: getRandomArrayLength(actorsFilms).join(`, `),
    date: getRandomArrayItem(datesFilms),
    country: getRandomArrayItem(countrysFilms),
    genre: getRandomArrayLength(genresFilms).join(` `),
    age: getRandomArrayItem(agesFilms),
  };
};
 
export {generatePopupFilm};
