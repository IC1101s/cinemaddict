import AbstractSmartComponent from "./abstract-smart-component.js";

const createEmojiTemplate = (emojis) => {
	return `<img src="./images/emoji/${emojis.isName}.png" width="100%" height="100%" alt="emoji-${emojis.isName}">`;
};

const createCommentMarkup = (comment) => {
  return comment.map((it) => { 
    return (
      `<li class="film-details__comment">
				<span class="film-details__comment-emoji">
				  <img src="${it.emojiImage}" width="55" height="55" alt="emoji-${it.name}">
				</span>
				<div>
				  <p class="film-details__comment-text">${it.text}</p>
				  <p class="film-details__comment-info">
				    <span class="film-details__comment-author">${it.author}</span>
				    <span class="film-details__comment-day">${it.day}</span>
				    <button class="film-details__comment-delete">Delete</button>
				  </p>
				</div>
			</li>`
    );
  })
	.join(`\n`);
};

const createEmojiInputMarkup = (emojis) => {
	const emojiNames = Object.keys(emojis.emoji);
	const emojiImages = Object.values(emojis.emoji);

  return emojiNames.map((name, index) => { 
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${name}" value="${name}">
			 <label class="film-details__emoji-label" for="emoji-${name}">
			   <img src="${emojiImages[index]}" width="30" height="30" alt="emoji-${name}">
			 </label>`
    );
  })
  .join(`\n`);
};

const createCommentsTemplate = (film, comments, emojis) => {
	const countComment = film.countComment;
	const commentLength = comments.slice(0, countComment);

  const createComments = createCommentMarkup(commentLength);
  const createEmojisInputs = createEmojiInputMarkup(emojis);
  const createEmoji = createEmojiTemplate(emojis);
  
  return (
  	`<div class="form-details__bottom-container">
		  <section class="film-details__comments-wrap">
		    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${countComment}</span></h3>

		    <ul class="film-details__comments-list">
		    	${createComments}
		    </ul>

		    <div class="film-details__new-comment">
		      <div for="add-emoji" class="film-details__add-emoji-label">${emojis.isName ? createEmoji : ``}</div>

		      <label class="film-details__comment-label">
		        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
		      </label>

		      <div class="film-details__emoji-list">
		        ${createEmojisInputs}
		      </div>
		    </div>
		  </section>
	  </div>`
  );
};

const createPopupTemplate = (film, comments, emojis) => {
	const {
		name, 
    rating, 
    year, 
    duration,  
    poster, 
    description, 
    director,
    writers,
    actors,
    date,
    country,
    genres,
    age,
    isActiveWatchlist, 
    isActiveWatched, 
    isActiveFavorite,
  } = film;

	const isSeveral = genres.split(' ').length > 1;
	const watchlistInput = isActiveWatchlist ? `checked` : ``;
  const watchedInput = isActiveWatched ? `checked` : ``;
  const favoriteInput = isActiveFavorite ? `checked` : ``;

  const createComments = createCommentsTemplate(film, comments, emojis);

  return (
    `<section class="film-details">
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
		              <td class="film-details__cell">${date} ${year}</td>
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
		                ${`<span class="film-details__genre">${genres}</span>`}
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
				  ${createComments}
		  </form>
		</section>`
	);
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film, comments, emojis) {
  	super();

		this._film = film;
    this._comments = comments;
    this._emojis = emojis;

    this._closeHandler = null;
    this._watchlistHandler = null;
    this._watchedHandler = null;
    this._favoritesHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createPopupTemplate(this._film, this._comments, this._emojis);
  }

  recoveryListeners() {
    this.setPopupCloseClickHandler(this._closeHandler);
    this.setWatchlistButtonClickHandler(this._watchlistHandler);
    this.setWatchedButtonClickHandler(this._watchedHandler);
    this.setFavoritesButtonClickHandler(this._favoritesHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this._emojis.isName = false;

    this.rerender();
  }

  setPopupCloseClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
     .addEventListener(`click`, handler);

    this._closeHandler = handler;
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, handler);

 		this._watchlistHandler = handler;
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, handler);

    this._watchedHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, handler);

    this._favoritesHandler = handler;
  }

  _subscribeOnEvents() {
  	const element = this.getElement();

		element.querySelectorAll(`.film-details__emoji-item`).forEach((it) => {
      it.addEventListener(`click`, () => {
        this._emojis.isName = it.value;

        this.rerender();   
      });
    });
  }
}
