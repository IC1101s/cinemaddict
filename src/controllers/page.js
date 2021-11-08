import MovieController from "./movie.js";
import FilmsListComponent from "../components/films-list.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import NoFilmsComponent from "../components/no-films.js";
import {SortType} from "../components/sort.js";
import {render, remove, RenderPosition} from "../utils/render.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilms = (filmsListContainer, films, comments, onDataChange, onViewChange) => {
	return films.map((film) => {
		const movieController = new MovieController(filmsListContainer, onDataChange, onViewChange);
	
		movieController.render(film, comments);

		return movieController;
	});
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  let showingFilms = films.slice();

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
	constructor(container, filmsModel, commentsModel, sortComponent) {
		this._container = container;
		this._filmsModel = filmsModel;
		this._commentsModel = commentsModel;
		this._sortComponent = sortComponent;

		this._showedMovieControllers = [];
		this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
		this._noFilmsComponent = new NoFilmsComponent();
		this._filmsListComponent = new FilmsListComponent();
		this._showMoreButtonComponent = new ShowMoreButtonComponent();

		this._onDataChange = this._onDataChange.bind(this);
		this._onSortTypeChange = this._onSortTypeChange.bind(this);
		this._onViewChange = this._onViewChange.bind(this);
		this._onLoadShowMoreButtonClick = this._onLoadShowMoreButtonClick.bind(this);
		this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
	}

	render() {
  	const container = this._container.getElement();
  	const films = this._filmsModel.getFilms();
		const isAllFilmsWatched = films.every((film) => film.isActiveWatched);

	  if (isAllFilmsWatched) {
	  	remove(this._sortComponent);
	    render(container, this._noFilmsComponent);
	    return;
	  }		

		render(container, this._filmsListComponent);

		this._renderFilms(films.slice(0, this._showingFilmsCount));
		
	  this._renderShowMoreButton();
	}

	_renderFilms(films) {
		const filmsListContainer = this._filmsListComponent.getElement()
		 .querySelector(`.films-list__container`);

		const newFilms = renderFilms(
	 		filmsListContainer, 
	 		films, 
	 		this._commentsModel.getComments(),
	 		this._onDataChange, 
	 		this._onViewChange,
	 	);

	 	this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

	 	this._showingFilmsCount = this._showedMovieControllers.length;
	}

	_removeFilms() {
    this._showedMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMovieControllers = [];
  }

  _updateFilms(count) {
    this._removeFilms();
    this._sortComponent.setDefaultType();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._renderShowMoreButton();
  }

	_renderShowMoreButton() {
		remove(this._showMoreButtonComponent);

		if (this._showingFilmsCount >= this._filmsModel.getFilms().length) {
      return;
    }	

    const filmsListElement = this._filmsListComponent.getElement();
		const filmsListContainer = filmsListElement.querySelector(`.films-list__container`);

		render(filmsListElement, this._showMoreButtonComponent);

		this._showMoreButtonComponent.setClickHandler(this._onLoadShowMoreButtonClick);
	}

	_onLoadShowMoreButtonClick() {
		const prevFilmsCount = this._showingFilmsCount;
		const films = this._filmsModel.getFilmsOld();

	  this._showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

	  const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);
	  this._renderFilms(sortedFilms);

		if (this._showingFilmsCount >= films.length) {
     	remove(this._showMoreButtonComponent);
    }	
  }

	_onDataChange(movieController, oldData, newData) { 
		const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData, this._commentsModel.getComments());
    }
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

	_onSortTypeChange(sortType) {
    this._showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

    const filmsListElement = this._filmsListComponent.getElement();
		const filmsListContElement = filmsListElement.querySelector(`.films-list__container`);

    const sortedFilms = getSortedFilms(this._filmsModel.getFilms(), sortType, 0, this._showingFilmsCount);

    filmsListContElement.innerHTML = ``;

    const newFilms = renderFilms(
		 	filmsListContElement, 
		  sortedFilms,
		  this._commentsModel.getComments(),
	 		this._onDataChange, 
	 		this._onViewChange,
		);	

    this._showedMovieControllers = newFilms;

		this._renderShowMoreButton();
  }

  _onFilterChange() {
    this._updateFilms(SHOWING_FILMS_COUNT_ON_START);
  }
}
