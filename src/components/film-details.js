import AbstractComponent from "./abstract-component.js";

const createFilmDetailsTemplate = () => {
	return (
		`<section class="film-details">
		  <form class="film-details__inner" action="" method="get">
		  </form>
		</section>`
	);
};

export default class FilmDetails extends AbstractComponent {
  getTemplate() {
		return createFilmDetailsTemplate();
	}
}
