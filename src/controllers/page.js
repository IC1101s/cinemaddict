import MovieController from "./movie.js";
import FilmsListComponent from "../components/films-list.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import NoFilmsComponent from "../components/no-films.js";
import {SortType} from "../components/sort.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import {formatDateYear} from "../utils/date.js"; 

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilms = (filmsListContainer, films, onDataChange, onViewChange) => {
	return films.map((film) => {
		const movieController = new MovieController(filmsListContainer, onDataChange, onViewChange);
	
		movieController.render(film);

		return movieController;
	});
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {	
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.dueDate - a.dueDate);
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
	constructor(container, sortComponent) {
		this._container = container;
		this._sortComponent = sortComponent;

		this._films = [];
		this._copyFilms = [];
		this._showedMovieControllers = [];
		this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
		this._noFilmsComponent = new NoFilmsComponent();
		this._filmsListComponent = new FilmsListComponent();
		this._showMoreButtonComponent = new ShowMoreButtonComponent();

		this._onDataChange = this._onDataChange.bind(this);
		this._onSortTypeChange = this._onSortTypeChange.bind(this);
		this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
	}

	render(films) {
		this._films = films;

  	const container = this._container.getElement();
		const isAllFilmsWatched = this._films.every((film) => film.isActiveWatched);

	  if (isAllFilmsWatched) {
	  	remove(this._sortComponent);
	    render(container, this._noFilmsComponent);
	    return;
	  }		

		render(container, this._filmsListComponent);

		const filmsListContainer = this._filmsListComponent.getElement()
		 .querySelector(`.films-list__container`);

	 	const newFilms = renderFilms(
	 		filmsListContainer, 
	 		this._films.slice(0, this._showingFilmsCount), 
	 		this._onDataChange, 
	 		this._onViewChange,
	 	);

	 	this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

	  this._renderShowMoreButton();

	  this._copyFilms = this._films.slice();
		for (let film of this._copyFilms) {
	  	film.dueDate = formatDateYear(film.dueDate);
	  }
	}

	_renderShowMoreButton() {
		if (this._showingFilmsCount >= this._films.length) {
      return;
    }	

    const filmsListElement = this._filmsListComponent.getElement();
		const filmsListContainer = filmsListElement.querySelector(`.films-list__container`);

		render(filmsListElement, this._showMoreButtonComponent);

		this._showMoreButtonComponent.setClickHandler(() => {
			const prevFilmsCount = this._showingFilmsCount;
		  this._showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

		  const sortedFilms = getSortedFilms(this._copyFilms, this._sortComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);
      const newFilms = renderFilms(
			 	filmsListContainer, 
			  sortedFilms, 
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

    movieController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

	_onSortTypeChange(sortType) {
    this._showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

    const filmsListElement = this._filmsListComponent.getElement();
		const filmsListContElement = filmsListElement.querySelector(`.films-list__container`);

    const sortedFilms = getSortedFilms(this._copyFilms, sortType, 0, this._showingFilmsCount);

    filmsListContElement.innerHTML = ``;

    const newFilms = renderFilms(
		 	filmsListContElement, 
		  sortedFilms, 
	 		this._onDataChange, 
	 		this._onViewChange,
		);	

    this._showedMovieControllers = newFilms;

    if (!filmsListElement.contains(this._showMoreButtonComponent.getElement())) {	
			this._renderShowMoreButton();
    } 
  }
}
