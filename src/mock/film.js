import {getRandomIntegerNumber, getRandomArrayItem, getRandomArrayLength, getRandomArrayLength2} from "../utils/common.js";
import {formatDateYear} from "../utils/date.js"; 

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
  8.3,
  9.0,
  2.3,
  5.5,
  4.7,
  8.7,
  7.3,
];

const datesFilms = [
  `1955-05-30T00:00:00.000Z`,
  `1964-03-14T00:00:00.000Z`,
  `1929-06-21T00:00:00.000Z`,
  `1940-07-29T00:00:00.000Z`,
  `1967-10-18T00:00:00.000Z`,
  `1980-11-03T00:00:00.000Z`,
]; 

const durationsFilms = [
  120,
  115,
  77,
  110,
  90,
  105,
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
  `Anthony Mann`,
];

const actorsFilms = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Richard Weil`,
  `Dan Duryea`,
  `Garvard Edison`,
  `Anthony Mann`,
];

const countrysFilms = [
  `USA`,
  `Russia`,
  `France`,
  `Germany`,
  `Canada`,
];

const agesFilms = [
  0,
  6,
  12,
  16,
  18,
];

const generateFilm = () => {
  const dueDate = getRandomArrayItem(datesFilms);
  const genre = genresFilms[getRandomIntegerNumber(0, genresFilms.length - 1)];
  const copyGenresFilms = genresFilms.slice();
  const deleteGenre = copyGenresFilms.splice(copyGenresFilms.indexOf(genre, 0), 1);
  const genres = [genre].concat(getRandomArrayLength(copyGenresFilms)).join(` `);

  return {
    id: String(new Date() + Math.random()),
    countComments: getRandomIntegerNumber(0, 4),
  	name: getRandomArrayItem(namesFilms),
    rating: getRandomArrayItem(ratingsFilms).toFixed(1),
    duration: getRandomArrayItem(durationsFilms),
    poster: getRandomArrayItem(postersFilms),
    description: getRandomArrayItem(descriptionsFilms),  
    director: getRandomArrayItem(directorsFilms), 
    country: getRandomArrayItem(countrysFilms),
    age: getRandomArrayItem(agesFilms),
    writers: getRandomArrayLength2(writersFilms).join(`, `),
    actors: getRandomArrayLength2(actorsFilms).join(`, `), 
    year: formatDateYear(dueDate),
    dueDate, 
    genres,
    genre,
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

export {generateFilms};
