import {createElement} from "../utils.js";

const createFilmMostCommentedTemplate = (films) => {
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
  } = films;

  const isBriefly = description.length <= 140;
  const watchlistButton = isActiveWatchlist ? `film-card__controls-item--active` : ``;
  const watchedButton = isActiveWatched ? `film-card__controls-item--active` : ``;
  const favoriteButton = isActiveFavorite ? `film-card__controls-item--active` : ``;

  return `<article class="film-card">
    <h3 class="film-card__title">${name}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="${poster}" alt="${name}" class="film-card__poster">
    <p class="film-card__description">
      ${isBriefly ? description : `${description.slice(0, 139)}...`}
    </p>
    <a class="film-card__comments">${commentCount} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistButton}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedButton}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteButton}">Mark as favorite</button>
    </form>
  </article>`;
};

export default class FilmMostCommented {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFilmMostCommentedTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
