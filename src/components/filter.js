import AbstractComponent from "./abstract-component.js";
import {FilterType} from "../const.js";

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createMainMenuMarkup = (filters, index) => {
	const {name, count, isActive} = filters;

	const nameFilter = name[0].toUpperCase() + name.slice(1);
	const nameFilterForAllMovies = `${nameFilter.slice(0, 3)} ${nameFilter.slice(3)}`;

	return (
		`<a href="#${name}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}" id="filter__${name}">
			${index === 0 ? `${nameFilterForAllMovies}` : `${nameFilter} <span class="main-navigation__item-count">${count}</span>`}  
		</a>`
	);
};

const createMainMenuTemplate = (filters) => {
	const createFilters = filters.map((it, index) => createMainMenuMarkup(it, index)).join(`\n`);

	return (
		`<nav class="main-navigation">
	    <div class="main-navigation__items">
	    	${createFilters}
	    </div>
	    <a href="#stats" class="main-navigation__additional">Stats</a>
	  </nav>`
	);
};

export default class Filter extends AbstractComponent {
	constructor(filters, activeFilterType) {
		super();
		
		this._filters = filters; 

		this._currentFilterType = activeFilterType;
	}

	getTemplate() {
		return createMainMenuTemplate(this._filters);
	}

	setFilterChangeHandler(handler) {
    const filterButtons = this.getElement().querySelectorAll(`.main-navigation__item`);

    filterButtons.forEach(filterButton => filterButton.addEventListener(`click`, (evt) => {
    	evt.preventDefault();

      const filterName = getFilterNameById(filterButton.id);

      if (this._currentFilterType === filterName) {
        return;
      }

      this._currentFilterType = filterName;

      handler(filterName);

      filterButtons.forEach((filterButton) => {
	      filterButton.classList.remove(`main-navigation__item--active`);
	    });
      filterButton.classList.add(`main-navigation__item--active`);
    }));
  }
}
