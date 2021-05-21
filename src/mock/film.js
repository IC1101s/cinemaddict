import {getRandomIntegerNumber, getRandomArrayItem} from "../utils/common.js";

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
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
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

const generateFilm = () => {
  return {
  	name: getRandomArrayItem(namesFilms),
    rating: getRandomArrayItem(ratingsFilms),
    year: getRandomArrayItem(yearsFilms),
    duration: getRandomArrayItem(durationsFilms),
    genre: getRandomArrayItem(genresFilms),
    poster: getRandomArrayItem(postersFilms),
    description: getRandomArrayItem(descriptionsFilms),
    commentCount: getRandomIntegerNumber(0, 5),
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
 
export {generateFilm, generateFilms};
