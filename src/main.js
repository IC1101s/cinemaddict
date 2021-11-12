import RankUserComponent from "./components/rank-user.js";
import SortComponent from "./components/sort.js";
import FilmsComponent from "./components/films.js";
import FilmStatisticsComponent from "./components/film-statistics.js";
import FilterController from "./controllers/filter.js"
import PageController from "./controllers/page.js";
import MoviesModel from "./models/movies.js";
import {generateFilms} from "./mock/film.js";
import {generateRank} from "./mock/rank-user.js";
import {render, RenderPosition} from "./utils/render.js";

const FILM_COUNT = 18;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`); 

const rank = generateRank();
render(headerElement, new RankUserComponent(rank));

const films = generateFilms(FILM_COUNT);
const filmsModel = new MoviesModel();
filmsModel.setFilms(films);

const filterController = new FilterController(mainElement, filmsModel);
filterController.render();

const sortComponent = new SortComponent();
render(mainElement, sortComponent);

const filmsComponent = new FilmsComponent();
const pageController = new PageController(filmsComponent, filmsModel, sortComponent);

render(mainElement, filmsComponent);
pageController.render(films);

render(footerStatisticsElement, new FilmStatisticsComponent(FILM_COUNT));
