import {getRandomIntegerNumber, getRandomArrayItem, getRandomArrayLength} from "../utils.js";
import {generateFilm} from "../mock/film.js"

const genreFilms = [
  `Drama`,
  `Comedy`,
  `Fantasy`,
  `Romance`,
  `Musical`,
  `Mystery`,
  `Film-Noir`,
];

const directorFilms = [
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

const dateFilms = [
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

const ageFilms = [
  `0`,
  `6`,
  `12`,
  `16`,
  `18`,
];

const generateСardFilm = () => {
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
    director: getRandomArrayItem(directorFilms),
    writers: getRandomArrayLength(writersFilms).join(`, `),
    actors: getRandomArrayLength(actorsFilms).join(`, `),
    date: getRandomArrayItem(dateFilms),
    country: getRandomArrayItem(countrysFilms),
    genre: getRandomArrayLength(genreFilms).join(` `),
    age: getRandomArrayItem(ageFilms),
  };
};
 
export {generateСardFilm};
