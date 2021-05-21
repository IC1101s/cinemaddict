import {getRandomIntegerNumber, getRandomArrayItem} from "../utils/common.js";
import {generateFilm} from "../mock/film.js"

const generateFilmTop = () => {
  const generateCopy = Object.assign({}, generateFilm());
  const {
    name, 
    rating, 
    year, 
    duration, 
    genre, 
    poster, 
    description, 
    commentCount, 
    isActiveWatchlist, 
    isActiveWatched,
    isActiveFavorite
  } = generateCopy;

  return {
  	name,
    rating,
    year,
    duration,
    genre,
    poster,
    description,
    commentCount,
    isActiveWatchlist,
    isActiveWatched,
    isActiveFavorite
  };
};

const generateFilmsTop = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmTop);
};

export {generateFilmTop, generateFilmsTop};
