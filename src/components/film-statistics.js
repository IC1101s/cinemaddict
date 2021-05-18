import {createElement} from "../utils.js";

const createFilmStatisticsTemplate = (value) => {
	let test = value;

	if (typeof value !== 'string') {
		test = String(value);
	}

  return `<section class="footer__statistics">
      <p>${test} movies inside</p>
  </section>`;
};

export default class FilmStatistics {
  constructor(value) {
    this._value = value;
    this._element = null;
  }

  getTemplate() {
    return createFilmStatisticsTemplate(this._value);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
