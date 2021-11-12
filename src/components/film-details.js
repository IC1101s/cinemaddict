import AbstractSmartComponent from "./abstract-smart-component.js";
import {formatDateFullDate, formatDuration, formatDateHumanReadable} from "../utils/date.js"; 
import {encode} from "he";

const createEmojiTemplate = (value) => {
	return `<img src="./images/emoji/${value}.png" width="55" height="55" alt="emoji-${value}">`;
};

const createCommentMarkup = (comments) => {	
  return comments.map((it) => {
  	const clearText = encode(it.text); 
		const dateHumanReadable = formatDateHumanReadable(it.date);
		
    return (
      `<li class="film-details__comment">
				<span class="film-details__comment-emoji">
				  <img src="./images/emoji/${it.emoji}.png" width="55" height="55" alt="emoji-${it.emoji}">
				</span>
				<div>
				  <p class="film-details__comment-text">${clearText}</p>
				  <p class="film-details__comment-info">
				    <span class="film-details__comment-author">${it.author}</span>
				    <span class="film-details__comment-day">${dateHumanReadable}</span>
				    <button class="film-details__comment-delete" id="${it.id}">Delete</button>
				  </p>
				</div>
			</li>`
    );
  })
	.join(`\n`);
};

const createEmojisInputMarkup = (film) => {
	const {emojis} = film;

  return emojis.map((it, index) => { 	
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emojis[index]}" value="${emojis[index]}">
			 <label class="film-details__emoji-label" for="emoji-${emojis[index]}">
			   <img src="./images/emoji/${emojis[index]}.png" width="30" height="30" alt="emoji-${emojis[index]}">
			 </label>`
    );
  })
  .join(`\n`);
};

const createCommentsTemplate = (film, comments, valueEmoji) => {
	const commentsCount = film.comments.length;
	const value = valueEmoji ? valueEmoji : ``;

  const createComments = createCommentMarkup(comments);
  const createEmoji = valueEmoji ? createEmojiTemplate(valueEmoji) : ``;
  const createEmojisInputs = createEmojisInputMarkup(film);
   	
  return (
  	`<div class="form-details__bottom-container">
		  <section class="film-details__comments-wrap">
		    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

		    <ul class="film-details__comments-list">
		    	${createComments}
		    </ul>

		    <div class="film-details__new-comment">
		      <div for="add-emoji" class="film-details__add-emoji-label">${createEmoji}</div>
		      <input class="film-details__add-emoji-value" type="hidden" name="emogi" value="${value}" required></input> 

		      <label class="film-details__comment-label">
		        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here\n(submit: Ctrl+Enter)" name="comment" required></textarea>
		      </label>

		      <div class="film-details__emoji-list">
		        ${createEmojisInputs}
		      </div>
		    </div>
		  </section>
	  </div>`
  );
};

const createPopupTemplate = (film, comments, valueEmoji) => {
	const {
		name, 
    rating,  
    duration,  
    poster, 
    description, 
    director,
    writers,
    actors,
    dueDate,
    country,
    genres,
    age,
    isActiveWatchlist, 
    isActiveWatched, 
    isActiveFavorite,
  } = film;

	const resultFieldName = genres.split(` `).length > 1 ? `Genres` : `Genre`;

	const date = formatDateFullDate(dueDate);
  const runtime = formatDuration(duration);

	const watchlistInput = isActiveWatchlist ? `checked` : ``;
  const watchedInput = isActiveWatched ? `checked` : ``;
  const favoriteInput = isActiveFavorite ? `checked` : ``;

  const commentsList = createCommentsTemplate(film, comments, valueEmoji);

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
		              <td class="film-details__cell">${date}</td>
		            </tr>
		            <tr class="film-details__row">
		              <td class="film-details__term">Runtime</td>
		              <td class="film-details__cell">${runtime}</td>
		            </tr>
		            <tr class="film-details__row">
		              <td class="film-details__term">Country</td>
		              <td class="film-details__cell">${country}</td>
		            </tr>
		            <tr class="film-details__row">
		              <td class="film-details__term">${resultFieldName}</td>
		              <td class="film-details__cell">
		                <span class="film-details__genre">${genres}</span>
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
	      ${commentsList}
		  </form>
 		</section>`
	);
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film, comments) {
  	super();

		this._film = film;
		this._comments = comments;

		this._valueEmoji = null;
    this._countPixels = null;
    this._closeHandler = null;
    this._watchlistHandler = null;
    this._watchedHandler = null;
    this._favoritesHandler = null;
    this._submitHandler = null;
    this._deleteButtonClickHandler = null;

    this._setEmojiButtonClick();
  }

  getTemplate() {
    return createPopupTemplate(this._film, this._comments, this._valueEmoji);
  }

  recoveryListeners() {
    this.setPopupCloseClickHandler(this._closeHandler);
    this.setWatchlistButtonClickHandler(this._watchlistHandler);
    this.setWatchedButtonClickHandler(this._watchedHandler);
    this.setFavoritesButtonClickHandler(this._favoritesHandler);
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._setEmojiButtonClick();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this._valueEmoji = null;

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

  getData() {
    const form = this.getElement().querySelector(`.film-details__inner`);
    const formData = new FormData(form);

    return this._parseFormData(formData);
  }

  isValid() {
  	const comment = this.getElement().querySelector(`.film-details__comment-input`);
  	const valueEmogi = this.getElement().querySelector(`.film-details__add-emoji-value`);
  
  	if (!!comment.value && !!valueEmogi.value) {
  		return true;
  	}

    return false;
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`keydown`, handler);

    this._submitHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`)
      .forEach((it) => {
	      it.addEventListener(`click`, (evt) => {
	      	evt.preventDefault();

	      	handler(it);
	      });
	    });

    this._deleteButtonClickHandler = handler;
  }

  _parseFormData(formData) {
	   return {
	    id: String(new Date() + Math.random()),
	    text: formData.get(`comment`),
	    author: `Stas Salnikov`,
	    date: formatDateHumanReadable(`now`),
	    emoji: formData.get(`emogi`),
	  }
	}

  _setEmojiButtonClick() {
  	const element = this.getElement();

		element.querySelectorAll(`.film-details__emoji-item`)
			.forEach((it) => {
	      it.addEventListener(`click`, () => {
	      	this._countPixels = element.scrollTop;
	        this._valueEmoji = it.value;

	        this.rerender();  

   				this.getElement().scrollTo(0, this._countPixels); 
	      });
	    });
  }
}
