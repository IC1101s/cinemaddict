import FilmComponent from "../components/film.js";
// import FilmTopRatedComponent from "../components/film-top.js";
// import FilmMostCommentedComponent from "../components/film-most-comment.js";
import FilmDetails from "../components/film-details.js";
import {render, replace, RenderPosition} from "../utils/render.js";

const mainElement = document.querySelector(`.main`);

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
  	this._container = container;
  	this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

 		this._filmComponent = null;
  	this._filmDetails = null;

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
    	render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (mainElement.contains(this._filmDetails.getElement())) {
      this._removePopup();
    }  
  }

  _addPopup() {
    this._onViewChange();
    document.addEventListener(`keydown`, this._onEscKeyDown);
    mainElement.appendChild(this._filmDetails.getElement()); 
	}

  _removePopup() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._filmDetails.reset();
    mainElement.removeChild(this._filmDetails.getElement()); 
  }

	_onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removePopup();
    }
  }
}
