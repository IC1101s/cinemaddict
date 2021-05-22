import FilmsListComponent from "../components/films-list.js";
import FilmComponent from "../components/film.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import SortComponent, {SortType} from "../components/sort.js";
import FilmsListTopRatedComponent from "../components/films-list-top.js";
import FilmsListMostCommentedComponent from "../components/films-list-most-comment.js";
import FilmTopRatedComponent from "../components/film-top.js";
import FilmMostCommentedComponent from "../components/film-most-comment.js";
import PopupComponent from "../components/popup.js";
import CommentsComponent from "../components/comments.js";
import NoFilmsComponent from "../components/no-films.js";
import {generatePopupFilm} from "../mock/popup.js";
import {generateComments, generateEmogis} from "../mock/comments.js";
import {render, remove, RenderPosition} from "../utils/render.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const COMMENT_COUNT = 4;
const EMOGI_COUNT = 4;

const mainElement = document.querySelector(`.main`);

const renderFilm = (filmsListContElement, filmComponent) => {
	const popups = generatePopupFilm();
	const comments = generateComments(COMMENT_COUNT);
	const emogis = generateEmogis(EMOGI_COUNT);

	const addPopup = () => {
    mainElement.appendChild(popupComponent.getElement()); 

		render(filmDetailsFormElement, commentsComponent, RenderPosition.BEFOREEND);
	};

	const removePopup = () => {
    mainElement.removeChild(popupComponent.getElement()); 
  };

	const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const popupComponent = new PopupComponent(popups);
  const commentsComponent = new CommentsComponent(comments, emogis);
  const filmDetailsFormElement = popupComponent.getElement().querySelector(`.film-details__inner`);

	filmComponent.setPopupClickHandler(() => {
		addPopup();
		document.addEventListener(`keydown`, onEscKeyDown);
	});

	popupComponent.setPopupCloseClickHandler(() => {
		removePopup();
		document.removeEventListener(`keydown`, onEscKeyDown);
	});
 
	render(filmsListContElement, filmComponent, RenderPosition.BEFOREEND);
};

const renderFilms = (filmListContElement, films, filmComponent) => {
  films.forEach((film) => {
    renderFilm(filmListContElement, new filmComponent(film));
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.year - a.year);
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class PageController {
	constructor(container) {
		this._container = container;

		this._noFilmsComponent = new NoFilmsComponent();
		this._filmsListComponent = new FilmsListComponent();
		this._filmsListTopRatedComponent = new FilmsListTopRatedComponent();
		this._filmsListMostCommentedComponent = new FilmsListMostCommentedComponent();
		this._showMoreButtonComponent = new ShowMoreButtonComponent();
		this._sortComponent = new SortComponent();
	}

	render(films, filmsTop, filmsMostCommented) {
		const renderShowMoreButton = () => {
			if (showingFilmsCount >= films.length) {
        return;
      }

			render(filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

			this._showMoreButtonComponent.setClickHandler(() => {
				const prevFilmsCount = showingFilmsCount;
			  showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

			  const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevFilmsCount, showingFilmsCount);

        renderFilms(filmsListContElement, sortedFilms, FilmComponent);

			  if (showingFilmsCount >= films.length) {
			    remove(this._showMoreButtonComponent);
			  }
			});
		};

		render(mainElement, this._sortComponent, RenderPosition.BEFOREEND);

  	const filmsComponent = this._container;
  	render(mainElement, filmsComponent, RenderPosition.BEFOREEND);

  	const container = this._container.getElement();
		const isAllFilmsWatched = films.every((film) => film.isActiveWatched);

	  if (isAllFilmsWatched) {
	    render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
	    return;
	  }		

		render(container, this._filmsListComponent, RenderPosition.BEFOREEND);

		const filmsListElement = this._filmsListComponent.getElement();
		const filmsListContElement = filmsListElement.querySelector(`.films-list__container`);

		let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
	 	renderFilms(filmsListContElement, films.slice(0, showingFilmsCount), FilmComponent);
	  renderShowMoreButton();

	  this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);

      filmsListContElement.innerHTML = ``;

      renderFilms(filmsListContElement, sortedFilms, FilmComponent);

      if (!filmsListElement.contains(this._showMoreButtonComponent.getElement())) {	
				renderShowMoreButton();
      } 
    });

		const filmsListTopRated = this._filmsListTopRatedComponent.getElement();
		const filmsListTopContElement = filmsListTopRated.querySelector(`.films-list__container`);

		render(container, this._filmsListTopRatedComponent, RenderPosition.BEFOREEND);
		renderFilms(filmsListTopContElement, filmsTop, FilmTopRatedComponent);

		const filmsListMostCommented = this._filmsListMostCommentedComponent.getElement();
		const filmsListMostContElement = filmsListMostCommented.querySelector(`.films-list__container`);

		render(container, this._filmsListMostCommentedComponent, RenderPosition.BEFOREEND);  
	  renderFilms(filmsListMostContElement, filmsMostCommented, FilmMostCommentedComponent);
	};
}
