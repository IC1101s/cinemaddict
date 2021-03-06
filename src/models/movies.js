import {getFilmsByFilter} from "../utils/filter.js";
import {FilterType} from "../const.js";

export default class Movies {
	constructor() {
		this._films = [];

		this._activeFilterType = FilterType.ALL;

		this._dataChangeHandlers = []; // this.render()
		this._filterChangeHandlers = []; // _updateFilms()

    this._filmsByFilter = null;
	}

	getFilms() {
    this._filmsByFilter = getFilmsByFilter(this._films, this._activeFilterType);

    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  getFilmsOld() {
    return this._filmsByFilter;
  }

  getFilmsAll() {
    return this._films;
  }

	setFilms(films) {
		this._films = films;
		this._callHandlers(this._dataChangeHandlers);
	}

	setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

	updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id); 

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers); 

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
