import AbstractComponent from "./abstract-component.js";
import MovieController from "../controllers/movie.js";

export const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
};

const createSortTemplate = () => {
	return (
    `<ul class="sort">
  	  <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
  	  <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
  	  <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
  	</ul>`
  );
};

export default class Sort extends AbstractComponent {
	constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

	getTemplate() {
		return createSortTemplate();
	}

	getSortType() {
    return this._currenSortType;
  }

	setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);

      this._changeSortButtonActive(evt.target);
    });
  }

  _changeSortButtonActive(target) {
    const buttons = document.querySelectorAll(`.sort__button`);
    buttons.forEach((button) => {
      button.classList.remove(`sort__button--active`);
    });

    target.classList.add(`sort__button--active`);
  }
}
