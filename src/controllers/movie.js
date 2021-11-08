import FilmComponent from "../components/film.js";
import FilmDetailsComponent from "../components/film-details.js";
import FilmDetailsInfoComponent from "../components/film-details-info.js";
import FilmDetailsCommentsComponent from "../components/film-details-comments.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

const Mode = {
  DETAILS_OPEN: `open`,
  DETAILS_CLOSE: `close`,
};

const body = document.querySelector(`body`);
const footer = body.querySelector(`footer`);

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
  	this._container = container;
  	this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DETAILS_CLOSE;

 		this._filmComponent = null;
  	this._filmDetails = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._onViewChange();
  }

  render(film, comments) {  
  	const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetails;
    const oldFilmDetailsCommentsComponent = this._filmDetailsComments;

    this._filmComponent = new FilmComponent(film);

    this._filmDetails = new FilmDetailsComponent();
    const filmDetailsContainer = this._filmDetails.getElement()
     .querySelector(`.film-details__inner`);

    this._filmDetailsInfo = new FilmDetailsInfoComponent(film);
    
    if (oldFilmDetailsCommentsComponent) {
      this._filmDetailsComments = oldFilmDetailsCommentsComponent;
    } else {
      this._filmDetailsComments = new FilmDetailsCommentsComponent(film, comments);
    }
    
    render(filmDetailsContainer, this._filmDetailsInfo);
    render(filmDetailsContainer, this._filmDetailsComments);

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

    this._filmDetailsInfo.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isActiveWatchlist: !film.isActiveWatchlist,
      }));
    });

    this._filmDetailsInfo.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isActiveWatched: !film.isActiveWatched,
      }));
    });

    this._filmDetailsInfo.setFavoritesButtonClickHandler(() => {  
      this._onDataChange(this, film, Object.assign({}, film, {
        isActiveFavorite: !film.isActiveFavorite,
      }));
    });

    this._filmDetailsInfo.setPopupCloseClickHandler(() => {
      this._removePopup();
    });
	 
		if (oldFilmComponent && oldFilmDetailsComponent) {
      // const countPixels = oldFilmDetailsComponent.getElement().scrollTop;

      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetails, oldFilmDetailsComponent);

      // this._filmDetails.getElement().scrollTo(0, this._countPixels); 
    } else {    
    	render(this._container, this._filmComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DETAILS_CLOSE) {
      this._removePopup();
    } 
  }

  destroy() {
    remove(this._filmDetails);
    remove(this._filmComponent);

    body.classList.remove(`hide-overflow-y`);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _activePopup() {
    this._onViewChange();

    render(footer, this._filmDetails, RenderPosition.AFTEREND); 

    document.addEventListener(`keydown`, this._onEscKeyDown);
    body.classList.add(`hide-overflow-y`);
    this._mode = Mode.DETAILS_OPEN;
	}

  _removePopup() {
    this._filmDetailsComments.reset();  
    this._filmDetails.getElement().remove(); 

    document.removeEventListener(`keydown`, this._onEscKeyDown);
    body.classList.remove(`hide-overflow-y`);
    this._mode = Mode.DETAILS_CLOSE;
  }

	_onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removePopup();
    }
  }
}
