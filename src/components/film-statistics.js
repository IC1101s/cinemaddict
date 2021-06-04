import AbstractComponent from "./abstract-component.js";

const createFilmStatisticsTemplate = (value) => {
	let str = value;

	if (typeof value !== 'string') {
		str = String(value);
	}

  return (
    `<section class="footer__statistics">
        <p>${str} movies inside</p>
    </section>`
  );
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
