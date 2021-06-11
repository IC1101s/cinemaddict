/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/abstract-component.js":
/*!**********************************************!*\
  !*** ./src/components/abstract-component.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractComponent)
/* harmony export */ });
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");


class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/abstract-smart-component.js":
/*!****************************************************!*\
  !*** ./src/components/abstract-smart-component.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractSmartComponent)
/* harmony export */ });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


class AbstractSmartComponent extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}


/***/ }),

/***/ "./src/components/film-details.js":
/*!****************************************!*\
  !*** ./src/components/film-details.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmDetails)
/* harmony export */ });
/* harmony import */ var _abstract_smart_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-smart-component.js */ "./src/components/abstract-smart-component.js");


const createEmojiTemplate = (emojis) => {
	return `<img src="./images/emoji/${emojis.isName}.png" width="55px" height="55px" alt="emoji-${emojis.isName}">`;
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
	const emojiNames = Object.keys(emojis.emojiNameToImage);
	const emojiImages = Object.values(emojis.emojiNameToImage);

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
				  ${createComments}
		  </form>
		</section>`
	);
};

class FilmDetails extends _abstract_smart_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
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


/***/ }),

/***/ "./src/components/film-statistics.js":
/*!*******************************************!*\
  !*** ./src/components/film-statistics.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmStatistics)
/* harmony export */ });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createFilmStatisticsTemplate = (value) => {
	let str = value;

	if (typeof value !== 'string') {
		str = String(value);
	}

  return (
    `<section class="footer__statistics">
        <p>${str} movies inside</p>
    </section>`
  );
};

class FilmStatistics extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor(value) {
    super();

    this._value = value;
  }

  getTemplate() {
    return createFilmStatisticsTemplate(this._value);
  }
}


/***/ }),

/***/ "./src/components/film.js":
/*!********************************!*\
  !*** ./src/components/film.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Film)
/* harmony export */ });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createFilmTemplate = (film) => {
  const {
    name, 
    rating, 
    year, 
    duration, 
    genre, 
    poster, 
    description, 
    countComment,
    isActiveWatchlist, 
    isActiveWatched, 
    isActiveFavorite,
  } = film;

  const isBriefly = description.length <= 140;

  const watchlistButton = isActiveWatchlist ? `film-card__controls-item--active` : ``;
  const watchedButton = isActiveWatched ? `film-card__controls-item--active` : ``;
  const favoriteButton = isActiveFavorite ? `film-card__controls-item--active` : ``;

	return (
    `<article class="film-card">
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
      <a class="film-card__comments">${countComment} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistButton}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedButton}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteButton}">Mark as favorite</button>
      </form>
    </article>`
  );
};

class Film extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  setPopupClickHandler(handler) {
    const areasClicks = [
      `film-card__poster`, 
      `film-card__title`, 
      `film-card__comments`
    ];

    areasClicks.forEach((areaClick) => {
      this.getElement().querySelector(`.${areaClick}`)
       .addEventListener(`click`, handler);
    });
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}


/***/ }),

/***/ "./src/components/films-list-most-comment.js":
/*!***************************************************!*\
  !*** ./src/components/films-list-most-comment.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmsListMostCommented)
/* harmony export */ });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createFilmsListMostCommentedTemplate = () => {
	return `<section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>

    <div class="films-list__container">
    </div>
  </section>`;
};

class FilmsListMostCommented extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
	getTemplate() {
		return createFilmsListMostCommentedTemplate();
	}
}


/***/ }),

/***/ "./src/components/films-list-top.js":
/*!******************************************!*\
  !*** ./src/components/films-list-top.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmsListTopRated)
/* harmony export */ });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createFilmsListTopRatedTemplate = () => {
	return `<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>

    <div class="films-list__container">
    </div>
  </section>`;
};

class FilmsListTopRated extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
	getTemplate() {
		return createFilmsListTopRatedTemplate();
	}
}


/***/ }),

/***/ "./src/components/films-list.js":
/*!**************************************!*\
  !*** ./src/components/films-list.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmsList)
/* harmony export */ });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createFilmsListTemplate = () => {
	return (
		`<section class="films-list">
	    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
	
	    <div class="films-list__container">
	   	</div>
	  </section>`
	);
};

class FilmsList extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
	getTemplate() {
		return createFilmsListTemplate();
	}
}


/***/ }),

/***/ "./src/components/films.js":
/*!*********************************!*\
  !*** ./src/components/films.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Films)
/* harmony export */ });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createFilmsTemplate = () => {
	return `<section class="films"></section>`;
};

class Films extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
	getTemplate() {
		return createFilmsTemplate();
	}
}


/***/ }),

/***/ "./src/components/main-menu.js":
/*!*************************************!*\
  !*** ./src/components/main-menu.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainMenu)
/* harmony export */ });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createMainMenuMarkup = (menu, isActive) => {
	const {
		name, 
		count,
		isAllMovies,
	} = menu; 

	let href = ``;
	if (isAllMovies) {
		href = name.slice(0, 3).toLowerCase();
	} else {
		href = name.toLowerCase();
	}

	return (
		`<a href="#${href}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${name}
			${!isAllMovies ? 
				`<span class="main-navigation__item-count">${count}</span>` 
			: ``}			
		</a>`
	);
};

const createMainMenuTemplate = (menu) => {
	const createMainMenu = menu.map((it, i) => createMainMenuMarkup(it, i === 0)).join(`\n`);

	return (
		`<nav class="main-navigation">
	    <div class="main-navigation__items">
	    	${createMainMenu}
	    </div>
	    <a href="#stats" class="main-navigation__additional">Stats</a>
	  </nav>`
	);
};

class MainMenu extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
	constructor(menu) {
		super();
		
		this._menu = menu;
	}

	getTemplate() {
		return createMainMenuTemplate(this._menu);
	}
}


/***/ }),

/***/ "./src/components/no-films.js":
/*!************************************!*\
  !*** ./src/components/no-films.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NoFilms)
/* harmony export */ });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createNoFilmsTemplate = () => {
	return (
		`<section class="films-list">
	    <h2 class="films-list__title">There are no movies in our database</h2>
	  </section>`
	);
};

class NoFilms extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
	getTemplate() {
		return createNoFilmsTemplate();
	}
}


/***/ }),

/***/ "./src/components/rank-user.js":
/*!*************************************!*\
  !*** ./src/components/rank-user.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RankUser)
/* harmony export */ });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createRankUserTemplate = (rank) => {
	return ( 
		`<section class="header__profile profile">
			<p class="profile__rating">${rank}</p>
			<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
		</section>`
	);
};

class RankUser extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
	constructor(rank) {
		super();

		this._rank = rank;
	}

	getTemplate() {
		return createRankUserTemplate(this._rank);
	}
}


/***/ }),

/***/ "./src/components/show-more-button.js":
/*!********************************************!*\
  !*** ./src/components/show-more-button.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowMoreButton)
/* harmony export */ });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createShowMoreButtonTemplate = () => {
	return `<button class="films-list__show-more">Show more</button>`;
};

class ShowMoreButton extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
  getTemplate() {
		return createShowMoreButtonTemplate();
	}

	setClickHandler(handler) {
		this.getElement().addEventListener(`click`, handler);
	}
}


/***/ }),

/***/ "./src/components/sort.js":
/*!********************************!*\
  !*** ./src/components/sort.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SortType": () => (/* binding */ SortType),
/* harmony export */   "default": () => (/* binding */ Sort)
/* harmony export */ });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");
/* harmony import */ var _controllers_movie_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/movie.js */ "./src/controllers/movie.js");



const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
};

const createSortTemplate = () => {
	return (
    `<ul class="sort">
  	  <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
  	  <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
  	  <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
  	</ul>`
  );
};

class Sort extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
	constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

	getTemplate() {
		return createSortTemplate();
	}

	getSortType() {
    return this._currenSortType;
  }

	setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);

      this._changeSortButtonActive(evt.target);
    });
  }

  _changeSortButtonActive(target) {
    const buttons = document.querySelectorAll(`.sort__button`);
    buttons.forEach((button) => {
      button.classList.remove(`sort__button--active`);
    });

    target.classList.add(`sort__button--active`);
  }
}


/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "USER_RANK": () => (/* binding */ USER_RANK)
/* harmony export */ });
const USER_RANK = [`Novice`, `Fan`, `Movie Buff`];




/***/ }),

/***/ "./src/controllers/movie.js":
/*!**********************************!*\
  !*** ./src/controllers/movie.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MovieController)
/* harmony export */ });
/* harmony import */ var _components_film_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/film.js */ "./src/components/film.js");
/* harmony import */ var _components_film_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/film-details.js */ "./src/components/film-details.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");

// import FilmTopRatedComponent from "../components/film-top.js";
// import FilmMostCommentedComponent from "../components/film-most-comment.js";



const Mode = {
  DETAILS_ON: `on`,
  DETAILS_OFF: `off`,
};

class MovieController {
  constructor(container, onDataChange, onViewChange) {
  	this._container = container;
  	this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DETAILS_OFF;
 		this._filmComponent = null;
  	this._filmDetails = null;

    this._filmDetailsChange = this._filmDetailsChange.bind(this);
    this._addPopup = this._addPopup.bind(this);
    this._removePopup = this._removePopup.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film, comments, emojis) { 
  	const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetails;

    this._filmComponent = new _components_film_js__WEBPACK_IMPORTED_MODULE_0__.default(film);
    this._filmDetails = new _components_film_details_js__WEBPACK_IMPORTED_MODULE_1__.default(film, comments, emojis);

    // this._filmTopRatedComponent = new FilmTopRatedComponent(film);
    // this._filmMostCommentedComponent = new FilmMostCommentedComponent(film);
    
		this._filmComponent.setPopupClickHandler(() => {
			this._addPopup();
		});

		this._filmComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault(); 
      this._onDataChange(this, film, Object.assign({}, film, {
        isActiveWatchlist: !film.isActiveWatchlist,
      }));
    });

    this._filmComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isActiveWatched: !film.isActiveWatched,
      }));
    });

    this._filmComponent.setFavoritesButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isActiveFavorite: !film.isActiveFavorite,
      }));
    });

    this._filmDetailsChange(film);
	 
		if (oldFilmComponent && oldFilmDetailsComponent) {
      (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.replace)(this._filmComponent, oldFilmComponent);
      (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.replace)(this._filmDetails, oldFilmDetailsComponent);
    } else {
    	(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.render)(this._container, this._filmComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_2__.RenderPosition.BEFOREEND);
    }
  }

  _filmDetailsChange(film) {
    this._filmDetails.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isActiveWatchlist: !film.isActiveWatchlist,
      }));
    });

    this._filmDetails.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isActiveWatched: !film.isActiveWatched,
      }));
    });

    this._filmDetails.setFavoritesButtonClickHandler(() => {  
      this._onDataChange(this, film, Object.assign({}, film, {
        isActiveFavorite: !film.isActiveFavorite,
      }));
    });

    this._filmDetails.setPopupCloseClickHandler(() => {
      this._removePopup();
    });
  }

  setDefaultView() {
    if (this._mode !== Mode.DETAILS_OFF) {
      this._removePopup();
    } 
  }

  _addPopup() {
    const footer = document.querySelector(`.footer`);

    this._onViewChange();
    document.addEventListener(`keydown`, this._onEscKeyDown);
    footer.after(this._filmDetails.getElement()); 
    this._mode = Mode.DETAILS_ON;
	}

  _removePopup() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._filmDetails.reset();
    this._filmDetails.getElement().remove(); 
    this._mode = Mode.DETAILS_OFF;
  }

	_onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removePopup();
    }
  }
}


/***/ }),

/***/ "./src/controllers/page.js":
/*!*********************************!*\
  !*** ./src/controllers/page.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PageController)
/* harmony export */ });
/* harmony import */ var _movie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./movie.js */ "./src/controllers/movie.js");
/* harmony import */ var _components_films_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/films-list.js */ "./src/components/films-list.js");
/* harmony import */ var _components_show_more_button_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/show-more-button.js */ "./src/components/show-more-button.js");
/* harmony import */ var _components_films_list_top_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/films-list-top.js */ "./src/components/films-list-top.js");
/* harmony import */ var _components_films_list_most_comment_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/films-list-most-comment.js */ "./src/components/films-list-most-comment.js");
/* harmony import */ var _components_no_films_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/no-films.js */ "./src/components/no-films.js");
/* harmony import */ var _components_sort_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/sort.js */ "./src/components/sort.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");





// import FilmComponent from "../components/film.js";
// import FilmTopRatedComponent from "../components/film-top.js";
// import FilmMostCommentedComponent from "../components/film-most-comment.js";




const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const mainElement = document.querySelector(`.main`);

const renderFilms = (filmListContElement, films, comments, emojis, onDataChange, onViewChange) => {
	return films.map((film) => {
		const movieController = new _movie_js__WEBPACK_IMPORTED_MODULE_0__.default(filmListContElement, onDataChange, onViewChange);

		movieController.render(film, comments, emojis);

		return movieController;
	});
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case _components_sort_js__WEBPACK_IMPORTED_MODULE_6__.SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.year - a.year);
      break;
    case _components_sort_js__WEBPACK_IMPORTED_MODULE_6__.SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case _components_sort_js__WEBPACK_IMPORTED_MODULE_6__.SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

class PageController {
	constructor(container) {
		this._container = container;

		this._films = [];
		this._comments = [];
		this._emojis = {};

		this._showedMovieControllers = [];
		this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

		this._noFilmsComponent = new _components_no_films_js__WEBPACK_IMPORTED_MODULE_5__.default();
		this._filmsListComponent = new _components_films_list_js__WEBPACK_IMPORTED_MODULE_1__.default();
		// this._filmsListTopRatedComponent = new FilmsListTopRatedComponent();
		// this._filmsListMostCommentedComponent = new FilmsListMostCommentedComponent();
		this._showMoreButtonComponent = new _components_show_more_button_js__WEBPACK_IMPORTED_MODULE_2__.default();
		this._sortComponent = new _components_sort_js__WEBPACK_IMPORTED_MODULE_6__.default();

		this._onDataChange = this._onDataChange.bind(this);
		this._onSortTypeChange = this._onSortTypeChange.bind(this);
		this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
	}

	render(films, comments, emojis) { //, filmsTop, filmsMostCommented
		this._films = films;
		this._comments = comments;
		this._emojis = emojis;

  	const container = this._container.getElement();
		const isAllFilmsWatched = this._films.every((film) => film.isActiveWatched);

	  if (isAllFilmsWatched) {
	  	(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_7__.render)(mainElement, this._container, _utils_render_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.BEFOREEND);
	    (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_7__.render)(container, this._noFilmsComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.BEFOREEND);
	    return;
	  }		

	  if (this._films.length > 1) {
	  	(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_7__.render)(mainElement, this._sortComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.BEFOREEND);
	  }
	  
  	(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_7__.render)(mainElement, this._container, _utils_render_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.BEFOREEND);

		(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_7__.render)(container, this._filmsListComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.BEFOREEND);

		const filmsListElement = this._filmsListComponent.getElement();
		const filmsListContElement = filmsListElement.querySelector(`.films-list__container`);

	 	const newFilms = renderFilms(
	 		filmsListContElement, 
	 		this._films.slice(0, this._showingFilmsCount), 
	 		this._comments, 
	 		this._emojis, 
	 		this._onDataChange, 
	 		this._onViewChange,
	 	);

	 	this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

	  this._renderShowMoreButton();

		// const filmsListTopRated = this._filmsListTopRatedComponent.getElement();
		// const filmsListTopContElement = filmsListTopRated.querySelector(`.films-list__container`);

		// render(container, this._filmsListTopRatedComponent, RenderPosition.BEFOREEND);
		// renderFilms(filmsListTopContElement, filmsTop);

		// const filmsListMostCommented = this._filmsListMostCommentedComponent.getElement();
		// const filmsListMostContElement = filmsListMostCommented.querySelector(`.films-list__container`);

		// render(container, this._filmsListMostCommentedComponent, RenderPosition.BEFOREEND);  
	 //  renderFilms(filmsListMostContElement, filmsMostCommented);
	}

	_renderShowMoreButton() {
		if (this._showingFilmsCount >= this._films.length) {
      return;
    }	

    const filmsListElement = this._filmsListComponent.getElement();
		const filmsListContElement = filmsListElement.querySelector(`.films-list__container`);

		(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_7__.render)(filmsListElement, this._showMoreButtonComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.BEFOREEND);

		this._showMoreButtonComponent.setClickHandler(() => {
			const prevFilmsCount = this._showingFilmsCount;
		  this._showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

		  const sortedFilms = getSortedFilms(this._films, this._sortComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);
      const newFilms = renderFilms(
			 	filmsListContElement, 
			  sortedFilms, 
		 		this._comments, 
		 		this._emojis, 
		 		this._onDataChange, 
		 		this._onViewChange,
			);

			this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

		  if (this._showingFilmsCount >= this._films.length) {
		    (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_7__.remove)(this._showMoreButtonComponent);
		  }
		});
	}

	_onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index], this._comments, this._emojis);
    // this._showedMovieControllers[index].render(this._films[index], this._comments, this._emojis);
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

	_onSortTypeChange(sortType) {
		// ПРИ ОТКРЫТОМ ПОПАПЕ И ПРИ ПЕРЕКЛЮЧЕНИИ СОРТИРОВКИ НЕ СБРАСЫВАЕТСЯ ПОПАП (при новом открытии создается ещё один попап) - ИСПРАВИТЬ!

    this._showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

    const filmsListElement = this._filmsListComponent.getElement();
		const filmsListContElement = filmsListElement.querySelector(`.films-list__container`);

    const sortedFilms = getSortedFilms(this._films, sortType, 0, this._showingFilmsCount);

    filmsListContElement.innerHTML = ``;

    const newFilms = renderFilms(
		 	filmsListContElement, 
		  sortedFilms, 
	 		this._comments, 
	 		this._emojis, 
	 		this._onDataChange, 
	 		this._onViewChange,
		);

    this._showedMovieControllers = newFilms;

    if (!filmsListElement.contains(this._showMoreButtonComponent.getElement())) {	
			this._renderShowMoreButton();
    } 
  }
}


/***/ }),

/***/ "./src/mock/film.js":
/*!**************************!*\
  !*** ./src/mock/film.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateFilm": () => (/* binding */ generateFilm),
/* harmony export */   "generateFilms": () => (/* binding */ generateFilms),
/* harmony export */   "generateComments": () => (/* binding */ generateComments),
/* harmony export */   "generateEmojis": () => (/* binding */ generateEmojis)
/* harmony export */ });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");


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
];

const actorsFilms = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Richard Weil`,
  `Dan Duryea`,
  `Ilon Mask`,
  `Anthony Mann`,
];

const datesFilms = [
  `30 March`,
  `14 May`,
  `21 June`,
  `29 July`,
  `18 October`,
  `3 November`,
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

const texts = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const authors = [
  `Tim Macoveev`,
  `John Doe`,
  `Mark Edit`,
  `Elvis Star`,
];

const days = [
  `2019/12/31 23:59`,
  `2 days ago`,
  `Today`,
  `3 days ago`,
];

const emojiNameToImage = {
  smile: `./images/emoji/smile.png`,
  sleeping: `./images/emoji/sleeping.png`,
  puke: `./images/emoji/puke.png`,
  angry: `./images/emoji/angry.png`,
};

const generateFilm = () => {
  const genres = (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayLength_2)(genresFilms);

  return {
    countComment: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomIntegerNumber)(0, 4),
  	name: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayItem)(namesFilms),
    rating: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayItem)(ratingsFilms),
    year: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayItem)(yearsFilms),
    duration: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayItem)(durationsFilms),
    poster: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayItem)(postersFilms),
    description: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayItem)(descriptionsFilms),  
    director: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayItem)(directorsFilms),
    date: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayItem)(datesFilms),
    country: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayItem)(countrysFilms),
    age: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayItem)(agesFilms),
    writers: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayLength)(writersFilms).join(`, `),
    actors: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayLength)(actorsFilms).join(`, `), 
    genres: genres.join(` `),
    genre: genres[(0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomIntegerNumber)(0, genres.length - 1)],
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

const generateComment = () => {
  const emojiImages = Object.values(emojiNameToImage);
  const names = Object.keys(emojiNameToImage);

  return {
    emojiImage: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayItem)(emojiImages),
    text: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayItem)(texts),
    author: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayItem)(authors),
    day: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayItem)(days),
    name: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayItem)(names)
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

const generateEmojis = () => {
  return {
    emojiNameToImage,
    isName: false,
  };
};




/***/ }),

/***/ "./src/mock/main-menu.js":
/*!*******************************!*\
  !*** ./src/mock/main-menu.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateMainMenu": () => (/* binding */ generateMainMenu)
/* harmony export */ });
const mainMenuNames = [
	`All movies`, `Watchlist`, `History`, `Favorites`
];

const generateMainMenu = () => {
	return mainMenuNames.map((it) => {	
		return {
			name: it,
			count: Math.floor(Math.random() * 18),
			isAllMovies: it === `All movies`,
		};
	});
};




/***/ }),

/***/ "./src/mock/rank-user.js":
/*!*******************************!*\
  !*** ./src/mock/rank-user.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateRank": () => (/* binding */ generateRank)
/* harmony export */ });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");



const generateRank = () => {
  const rating = (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomIntegerNumber)(0, 25);
  let currentRating = ``;

  if (rating >= 1 && rating <= 10) {
    currentRating = _const_js__WEBPACK_IMPORTED_MODULE_1__.USER_RANK[0];
  } else if (rating >= 11 && rating <= 20) {
    currentRating = _const_js__WEBPACK_IMPORTED_MODULE_1__.USER_RANK[1];
  } else if (rating >= 21) {
    currentRating = _const_js__WEBPACK_IMPORTED_MODULE_1__.USER_RANK[2];
  }

  return currentRating;
};




/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomIntegerNumber": () => (/* binding */ getRandomIntegerNumber),
/* harmony export */   "getRandomArrayItem": () => (/* binding */ getRandomArrayItem),
/* harmony export */   "getRandomArrayLength": () => (/* binding */ getRandomArrayLength),
/* harmony export */   "getRandomArrayLength_2": () => (/* binding */ getRandomArrayLength_2)
/* harmony export */ });
const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);
  
  return array[randomIndex];
};

const getRandomArrayLength = (array) => {
  return array.slice(0, getRandomIntegerNumber(2, array.length));
}; 

const getRandomArrayLength_2 = (array) => {
  return array.slice(getRandomIntegerNumber(0, array.length - 1));
}; 


/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "remove": () => (/* binding */ remove)
/* harmony export */ });
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;  

  return newElement.firstChild;
};

const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_rank_user_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/rank-user.js */ "./src/components/rank-user.js");
/* harmony import */ var _components_main_menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/main-menu.js */ "./src/components/main-menu.js");
/* harmony import */ var _components_films_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/films.js */ "./src/components/films.js");
/* harmony import */ var _controllers_page_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controllers/page.js */ "./src/controllers/page.js");
/* harmony import */ var _components_film_statistics_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/film-statistics.js */ "./src/components/film-statistics.js");
/* harmony import */ var _mock_film_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mock/film.js */ "./src/mock/film.js");
/* harmony import */ var _mock_rank_user_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mock/rank-user.js */ "./src/mock/rank-user.js");
/* harmony import */ var _mock_main_menu_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mock/main-menu.js */ "./src/mock/main-menu.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/render.js */ "./src/utils/render.js");







// import {generateFilmsTop} from "./mock/film-top.js";
// import {generateFilmsMostCommented} from "./mock/film-most-comment.js";
 


// import moment from "moment"; 
// console.log(moment().format(`YYYY/MM/DD HH:mm`)); moment РЕАЛИЗОВАТЬ ПОЗЖЕ!!!

const FILM_COUNT = 18;
const COMMENT_COUNT_MAX = 4;
// const FILM_TOP_COUNT = 2;
// const FILM_MOST_COMMENTED_COUNT = 2;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`); 

const ranks = (0,_mock_rank_user_js__WEBPACK_IMPORTED_MODULE_6__.generateRank)();
const menu = (0,_mock_main_menu_js__WEBPACK_IMPORTED_MODULE_7__.generateMainMenu)();
const films = (0,_mock_film_js__WEBPACK_IMPORTED_MODULE_5__.generateFilms)(FILM_COUNT);
const comments = (0,_mock_film_js__WEBPACK_IMPORTED_MODULE_5__.generateComments)(COMMENT_COUNT_MAX);
const emojis = (0,_mock_film_js__WEBPACK_IMPORTED_MODULE_5__.generateEmojis)();
// const filmsTop = generateFilmsTop(FILM_TOP_COUNT);
// const filmsMostCommented = generateFilmsMostCommented(FILM_MOST_COMMENTED_COUNT);

(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_8__.render)(headerElement, new _components_rank_user_js__WEBPACK_IMPORTED_MODULE_0__.default(ranks), _utils_render_js__WEBPACK_IMPORTED_MODULE_8__.RenderPosition.BEFOREEND);
(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_8__.render)(mainElement, new _components_main_menu_js__WEBPACK_IMPORTED_MODULE_1__.default(menu), _utils_render_js__WEBPACK_IMPORTED_MODULE_8__.RenderPosition.BEFOREEND);

const filmsComponent = new _components_films_js__WEBPACK_IMPORTED_MODULE_2__.default();
const pageController = new _controllers_page_js__WEBPACK_IMPORTED_MODULE_3__.default(filmsComponent);

pageController.render(films, comments, emojis); //, filmsTop, filmsMostCommented

const statisticsValue = `130 291`;
(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_8__.render)(footerStatisticsElement, new _components_film_statistics_js__WEBPACK_IMPORTED_MODULE_4__.default(statisticsValue), _utils_render_js__WEBPACK_IMPORTED_MODULE_8__.RenderPosition.BEFOREEND);



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map