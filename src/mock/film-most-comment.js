import {getRandomIntegerNumber, getRandomArrayItem} from "../utils.js";
import {generateFilm} from "../mock/film.js"

const generateFilmMostCommented = () => {
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

const generateFilmsMostCommented = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmMostCommented);
};

export {generateFilmMostCommented, generateFilmsMostCommented};
