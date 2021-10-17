import FilmComponent from "../components/film.js";
import FilmDetails from "../components/film-details.js";
import {generateComments} from "../mock/comment.js";
import {render, replace, RenderPosition} from "../utils/render.js";

const COMMENT_COUNT_MAX = 4;

const Mode = {
  DETAILS_OPEN: `open`,
  DETAILS_CLOSE: `close`,
};

const emojiNameToImage = {
  smile: `./images/emoji/smile.png`,
  sleeping: `./images/emoji/sleeping.png`,
  puke: `./images/emoji/puke.png`,
  angry: `./images/emoji/angry.png`,
};

const footer = document.querySelector(`footer`);

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
  	this._container = container;
  	this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DETAILS_CLOSE;

    this._comments = generateComments(COMMENT_COUNT_MAX);
    this._emojis = emojiNameToImage;

 		this._filmComponent = null;
  	this._filmDetails = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._onViewChange();
  }

  render(film) {  
  	const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetails;

    this._filmComponent = new FilmComponent(film);
    this._filmDetails = new FilmDetails(film, this._comments, this._emojis);
    
		this._filmComponent.setPopupClickHandler(() => {
      if (this._mode !== Mode.DETAILS_OPEN) {
        this._activePopup();
      }
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
	 
		if (oldFilmComponent && oldFilmDetailsComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetails, oldFilmDetailsComponent);
    } else {    
    	render(this._container, this._filmComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DETAILS_CLOSE) {
      this._removePopup();
    } 
  }

  _activePopup() {
    this._onViewChange();
    document.addEventListener(`keydown`, this._onEscKeyDown);
    render(footer, this._filmDetails, RenderPosition.AFTEREND);
    this._mode = Mode.DETAILS_OPEN;
	}

  _removePopup() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._filmDetails.reset();
    this._filmDetails.getElement().remove();
    this._mode = Mode.DETAILS_CLOSE;
  }

	_onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removePopup();
    }
  }
}
