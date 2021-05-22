import RankUserComponent from "./components/rank-user.js";
import MainMenuComponent from "./components/main-menu.js";
import FilmsComponent from "./components/films.js";
import FilmStatisticsComponent from "./components/film-statistics.js";
import PageController from "./controllers/page.js";
import {render, RenderPosition} from "./utils/render.js";
import {generateFilms} from "./mock/film.js";
import {generateRank} from "./mock/rank-user.js";
import {generateFilmsTop} from "./mock/film-top.js";
import {generateFilmsMostCommented} from "./mock/film-most-comment.js";
import {generateMainMenu} from "./mock/main-menu.js"; 

const FILM_COUNT = 18;
const FILM_TOP_COUNT = 2;
const FILM_MOST_COMMENTED_COUNT = 2;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`); 

const ranks = generateRank();
const menu = generateMainMenu();
const films = generateFilms(FILM_COUNT);
const filmsTop = generateFilmsTop(FILM_TOP_COUNT);
const filmsMostCommented = generateFilmsMostCommented(FILM_MOST_COMMENTED_COUNT);
const statisticsValue = 130291;

render(headerElement, new RankUserComponent(ranks), RenderPosition.BEFOREEND);
render(mainElement, new MainMenuComponent(menu), RenderPosition.BEFOREEND);

const filmsComponent = new FilmsComponent();
const pageController = new PageController(filmsComponent);

pageController.render(films, filmsTop, filmsMostCommented);

render(footerStatisticsElement, new FilmStatisticsComponent(statisticsValue), RenderPosition.BEFOREEND);
