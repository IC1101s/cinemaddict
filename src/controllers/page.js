import MovieController from "./movie.js";
import FilmsListComponent from "../components/films-list.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import FilmsListTopRatedComponent from "../components/films-list-top.js";
import FilmsListMostCommentedComponent from "../components/films-list-most-comment.js";
// import FilmComponent from "../components/film.js";
// import FilmTopRatedComponent from "../components/film-top.js";
// import FilmMostCommentedComponent from "../components/film-most-comment.js";
import NoFilmsComponent from "../components/no-films.js";
import SortComponent, {SortType} from "../components/sort.js";
import {render, remove, RenderPosition} from "../utils/render.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const mainElement = document.querySelector(`.main`);

const renderFilms = (filmListContElement, films, comments, emojis, onDataChange, onViewChange) => {
	return films.map((film) => {
		const movieController = new MovieController(filmListContElement, onDataChange, onViewChange);

		movieController.render(film, comments, emojis);

		return movieController;
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

		this._films = [];
		this._comments = [];
		this._emojis = {};

		this._showedMovieControllers = [];
		this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

		this._noFilmsComponent = new NoFilmsComponent();
		this._filmsListComponent = new FilmsListComponent();
		// this._filmsListTopRatedComponent = new FilmsListTopRatedComponent();
		// this._filmsListMostCommentedComponent = new FilmsListMostCommentedComponent();
		this._showMoreButtonComponent = new ShowMoreButtonComponent();
		this._sortComponent = new SortComponent();

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
	  	render(mainElement, this._container, RenderPosition.BEFOREEND);
	    render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
	    return;
	  }		

	  if (this._films.length > 1) {
	  	render(mainElement, this._sortComponent, RenderPosition.BEFOREEND);
	  }
	  
  	render(mainElement, this._container, RenderPosition.BEFOREEND);

		render(container, this._filmsListComponent, RenderPosition.BEFOREEND);

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

		render(filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

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
		    remove(this._showMoreButtonComponent);
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
