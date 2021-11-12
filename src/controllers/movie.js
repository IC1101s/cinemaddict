import FilmComponent from "../components/film.js";
import FilmDetailsComponent from "../components/film-details.js";
import CommentsModel from "../models/comments.js";
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

    this._commentsModel = new CommentsModel();

 		this._filmComponent = null;
    this._filmDetails = null;
    this._countPixels = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._onViewChange();
  }

  render(film) {  
  	const oldFilmComponent = this._filmComponent;

    this._filmComponent = new FilmComponent(film);
 
		this._filmComponent.setPopupClickHandler(() => {
      if (this._mode !== Mode.DETAILS_OPEN) {
        this._activeFilmDetails(film);
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

		if (oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
    } else {    
    	render(this._container, this._filmComponent);
    }

    if (this._mode === Mode.DETAILS_OPEN && oldFilmComponent) {
      this._countPixels = this._filmDetails.getElement().scrollTop;
      remove(this._filmDetails);
      this._renderFilmDetails(film);
    }
  }

  _renderFilmDetails(film) {
    this._commentsModel.setComments(film.comments);
    const comments = this._commentsModel.getComments();

    this._filmDetails = new FilmDetailsComponent(film, comments);
    render(footer, this._filmDetails, RenderPosition.AFTEREND);

    this._filmDetails.getElement().scrollTo(0, this._countPixels); 
    this._countPixels = null;

    const addComment = (evt) => {
      const isCtrlEnterKey = (evt.ctrlKey && evt.code === `Enter`); // Ctrl+Enter
      const isValid = this._filmDetails.isValid();

      if (isCtrlEnterKey && isValid) {
        const data = this._filmDetails.getData(); 

        this._commentsModel.addComment(data);

        this._onDataChange(this, film, Object.assign({}, film, {
          comments: this._commentsModel.getComments(),
        }));
      }
    };

    const removeComment = (data) => {
      this._commentsModel.removeComment(data.id);

      this._onDataChange(this, film, Object.assign({}, film, {
        comments: this._commentsModel.getComments(),
      }));
    };
  
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
      this._removeFilmDetails();
    });

    this._filmDetails.setSubmitHandler(addComment);
    this._filmDetails.setDeleteButtonClickHandler(removeComment); 
  }

  setDefaultView() {
    if (this._mode !== Mode.DETAILS_CLOSE) {
      this._removeFilmDetails();
    } 
  }

  destroy() {
    if (this._mode === Mode.DETAILS_OPEN) {
      remove(this._filmDetails);
    }

    remove(this._filmComponent);
    body.classList.remove(`hide-overflow-y`);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _activeFilmDetails(film) {
    this._onViewChange();
    this._renderFilmDetails(film);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    body.classList.add(`hide-overflow-y`);
    this._mode = Mode.DETAILS_OPEN;
	}

  _removeFilmDetails() {
    this._filmDetails.reset(); 
    remove(this._filmDetails);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    body.classList.remove(`hide-overflow-y`);
    this._mode = Mode.DETAILS_CLOSE;
  }

	_onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removeFilmDetails();
    }
  }
}

// Как-то использовать функцию для сохранения значения valueEmoji в FilmDetails
// _test(value) {
//   this._valueEmoji = value;
//   // console.log(this._valueEmoji);
// }
