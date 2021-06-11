import FilmComponent from "../components/film.js";
// import FilmTopRatedComponent from "../components/film-top.js";
// import FilmMostCommentedComponent from "../components/film-most-comment.js";
import FilmDetails from "../components/film-details.js";
import {render, replace, RenderPosition} from "../utils/render.js";

const Mode = {
  DETAILS_ON: `on`,
  DETAILS_OFF: `off`,
};

export default class MovieController {
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

    this._filmComponent = new FilmComponent(film);
    this._filmDetails = new FilmDetails(film, comments, emojis);

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
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetails, oldFilmDetailsComponent);
    } else {
    	render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
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
