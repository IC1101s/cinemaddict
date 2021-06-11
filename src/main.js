import RankUserComponent from "./components/rank-user.js";
import MainMenuComponent from "./components/main-menu.js";
import FilmsComponent from "./components/films.js";
import PageController from "./controllers/page.js";
import FilmStatisticsComponent from "./components/film-statistics.js";
import {generateFilms, generateComments, generateEmojis} from "./mock/film.js";
import {generateRank} from "./mock/rank-user.js";
// import {generateFilmsTop} from "./mock/film-top.js";
// import {generateFilmsMostCommented} from "./mock/film-most-comment.js";
import {generateMainMenu} from "./mock/main-menu.js"; 
import {render, RenderPosition} from "./utils/render.js";

// import moment from "moment"; 
// console.log(moment().format(`YYYY/MM/DD HH:mm`)); moment РЕАЛИЗОВАТЬ ПОЗЖЕ!!!

const FILM_COUNT = 18;
const COMMENT_COUNT_MAX = 4;
// const FILM_TOP_COUNT = 2;
// const FILM_MOST_COMMENTED_COUNT = 2;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`); 

const ranks = generateRank();
const menu = generateMainMenu();
const films = generateFilms(FILM_COUNT);
const comments = generateComments(COMMENT_COUNT_MAX);
const emojis = generateEmojis();
// const filmsTop = generateFilmsTop(FILM_TOP_COUNT);
// const filmsMostCommented = generateFilmsMostCommented(FILM_MOST_COMMENTED_COUNT);

render(headerElement, new RankUserComponent(ranks), RenderPosition.BEFOREEND);
render(mainElement, new MainMenuComponent(menu), RenderPosition.BEFOREEND);

const filmsComponent = new FilmsComponent();
const pageController = new PageController(filmsComponent);

pageController.render(films, comments, emojis); //, filmsTop, filmsMostCommented

const statisticsValue = `130 291`;
render(footerStatisticsElement, new FilmStatisticsComponent(statisticsValue), RenderPosition.BEFOREEND);


