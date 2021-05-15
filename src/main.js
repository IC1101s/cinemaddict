import {createRankUserTemplate} from "./components/rank-user.js";
import {createMainMenuTemplate} from "./components/main-menu.js";
import {createSortTemplate} from "./components/sort.js";
import {createFilmsListTemplate} from "./components/films-list.js";
import {createFilmTemplate} from "./components/film.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createFilmsListTopRatedTemplate} from "./components/films-list-top.js";
import {createFilmsListMostCommentedTemplate} from "./components/films-list-most-comment.js";
import {createFilmTopRatedTemplate} from "./components/film-top.js";
import {createFilmMostCommentedTemplate} from "./components/film-most-comment.js";
import {createFilmStatisticsTemplate} from "./components/film-statistics.js";
import {createCommentsTemplate} from "./components/comments.js";
import {createPopupTemplate} from "./components/popup.js";
import {generateFilms} from "./mock/film.js";
import {generateRank} from "./mock/rank-user.js";
import {generateСardFilm} from "./mock/popup.js";
import {generateFilmsTop} from "./mock/film-top.js";
import {generateFilmsMostCommented} from "./mock/film-most-comment.js";
import {generateMainMenu} from "./mock/main-menu.js"; 
import {generateComments, generateEmogis} from "./mock/comments.js";

const FILM_COUNT = 18;
const FILM_EXTRA_COUNT = 2;
const COMMENT_COUNT = 4;
const EMOGI_COUNT = 4;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const LIST_TOP_VALUE = 0;
const LIST_MOST_VALUE = 1;

const render = (container, template, place = `beforeend`) => {
	container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`); 

const films = generateFilms(FILM_COUNT);
const rank = generateRank();
const menu = generateMainMenu();
const card = generateСardFilm();
const filmsTop = generateFilmsTop(FILM_EXTRA_COUNT);
const filmsMostCommented = generateFilmsMostCommented(FILM_EXTRA_COUNT);
const comment = generateComments(COMMENT_COUNT);
const emogi = generateEmogis(EMOGI_COUNT);

render(headerElement, createRankUserTemplate(rank));
render(mainElement, createMainMenuTemplate(menu));
render(mainElement, createSortTemplate());
render(mainElement, createFilmsListTemplate());

const filmsElement = mainElement.querySelector(`.films`); 
const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContElement = filmsListElement.querySelector(`.films-list__container`);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

films.slice(0, showingFilmsCount).forEach((film) => render(filmsListContElement, createFilmTemplate(film)));

render(filmsListElement, createShowMoreButtonTemplate());

const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
	const prevFilmsCount = showingFilmsCount;
  showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => render(filmsListContElement, createFilmTemplate(film)));

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }
});

render(filmsElement, createFilmsListTopRatedTemplate());
render(filmsElement, createFilmsListMostCommentedTemplate());

const filmsListTopElement = filmsElement.querySelectorAll(`.films-list--extra`);
const filmsListTopContElement = filmsListTopElement[LIST_TOP_VALUE].querySelector(`.films-list__container`);
const filmsListMostContElement = filmsListTopElement[LIST_MOST_VALUE].querySelector(`.films-list__container`);  

filmsTop.forEach((film) => render(filmsListTopContElement, createFilmTopRatedTemplate(film)));
filmsMostCommented.forEach((film) => render(filmsListMostContElement, createFilmMostCommentedTemplate(film)));

// render(mainElement, createPopupTemplate(card));

// const filmDetailsElement = document.querySelector(`.film-details__inner`);
// render(filmDetailsElement, createCommentsTemplate(comment, emogi));

const statisticsValue = 130291;
render(footerStatisticsElement, createFilmStatisticsTemplate(statisticsValue));
