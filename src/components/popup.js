import {createElement} from "../utils.js";

const createPopupTemplate = (popup) => {
	const {
		poster, 
		name, 
		rating, 
		director, 
		writers, 
		actors, 
		date, 
		duration, 
		country, 
		genre, 
		age, 
		description, 
		isActiveWatchlist,
		isActiveWatched,
		isActiveFavorite
	} = popup;

	const isSeveral = genre.split(' ').length > 1;
	const watchlistInput = isActiveWatchlist ? `checked` : ``;
  const watchedInput = isActiveWatched ? `checked` : ``;
  const favoriteInput = isActiveFavorite ? `checked` : ``;

  return `<section class="film-details">
	  <form class="film-details__inner" action="" method="get">
	    <div class="form-details__top-container">
	      <div class="film-details__close">
	        <button class="film-details__close-btn" type="button">close</button>
	      </div>
	      <div class="film-details__info-wrap">
	        <div class="film-details__poster">
	          <img class="film-details__poster-img" src="${poster}" alt="${name}">

	          <p class="film-details__age">${age}+</p>
	        </div>

	        <div class="film-details__info">
	          <div class="film-details__info-head">
	            <div class="film-details__title-wrap">
	              <h3 class="film-details__title">${name}</h3>
	              <p class="film-details__title-original">Original: ${name}</p>
	            </div>

	            <div class="film-details__rating">
	              <p class="film-details__total-rating">${rating}</p>
	            </div>
	          </div>

	          <table class="film-details__table">
	            <tr class="film-details__row">
	              <td class="film-details__term">Director</td>
	              <td class="film-details__cell">${director}</td>
	            </tr>
	            <tr class="film-details__row">
	              <td class="film-details__term">Writers</td>
	              <td class="film-details__cell">${writers}</td>
	            </tr>
	            <tr class="film-details__row">
	              <td class="film-details__term">Actors</td>
	              <td class="film-details__cell">${actors}</td>
	            </tr>
	            <tr class="film-details__row">
	              <td class="film-details__term">Release Date</td>
	              <td class="film-details__cell">${date}</td>
	            </tr>
	            <tr class="film-details__row">
	              <td class="film-details__term">Runtime</td>
	              <td class="film-details__cell">${duration}</td>
	            </tr>
	            <tr class="film-details__row">
	              <td class="film-details__term">Country</td>
	              <td class="film-details__cell">${country}</td>
	            </tr>
	            <tr class="film-details__row">
	              <td class="film-details__term">${isSeveral ? `Genres` : `Genre`}</td>
	              <td class="film-details__cell">
	                ${`<span class="film-details__genre">${genre}</span>`}
	              </td>
	            </tr>
	          </table>

	          <p class="film-details__film-description">
	            ${description}
	          </p>
	        </div>
	      </div>

	      <section class="film-details__controls">
	        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlistInput}>
	        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

	        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watchedInput}>
	        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

	        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoriteInput}>
	        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
	      </section>
	    </div>

	  </form>
	</section>`;
};

export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._element = null;
  }

  getTemplate() {
    return createPopupTemplate(this._popup);
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
