import AbstractComponent from "./abstract-component.js";

const createFilmStatisticsTemplate = (value) => {
	let test = value;

	if (typeof value !== 'string') {
		test = String(value);
	}

  return `<section class="footer__statistics">
      <p>${test} movies inside</p>
  </section>`;
};

export default class FilmStatistics extends AbstractComponent {
  constructor(value) {
    super();

    this._value = value;
  }

  getTemplate() {
    return createFilmStatisticsTemplate(this._value);
  }
}
