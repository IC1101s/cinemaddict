import RankUserComponent from "./components/rank-user.js";
import MainMenuComponent from "./components/main-menu.js";
import SortComponent from "./components/sort.js";
import FilmsComponent from "./components/films.js";
import PageController from "./controllers/page.js";
import FilmStatisticsComponent from "./components/film-statistics.js";
import {generateFilms} from "./mock/film.js";
import {generateRank} from "./mock/rank-user.js";
import {generateMainMenu} from "./mock/main-menu.js"; 
import {render, RenderPosition} from "./utils/render.js";

const FILM_COUNT = 18;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`); 

const rank = generateRank();
const menu = generateMainMenu();
const films = generateFilms(FILM_COUNT);

render(headerElement, new RankUserComponent(rank));
render(mainElement, new MainMenuComponent(menu));

const sortComponent = new SortComponent();
render(mainElement, sortComponent);

const filmsComponent = new FilmsComponent();
const pageController = new PageController(filmsComponent, sortComponent);

render(mainElement, filmsComponent);
pageController.render(films);

render(footerStatisticsElement, new FilmStatisticsComponent(FILM_COUNT));
