import RankUserComponent from "./components/rank-user.js";
import MainMenuComponent from "./components/main-menu.js";
import SortComponent from "./components/sort.js";
import FilmsComponent from "./components/films.js";
import FilmsListComponent from "./components/films-list.js";
import FilmComponent from "./components/film.js";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import FilmsListTopRatedComponent from "./components/films-list-top.js";
import FilmsListMostCommentedComponent from "./components/films-list-most-comment.js";
import FilmTopRatedComponent from "./components/film-top.js";
import FilmMostCommentedComponent from "./components/film-most-comment.js";
import FilmStatisticsComponent from "./components/film-statistics.js";
import PopupComponent from "./components/popup.js";
import CommentsComponent from "./components/comments.js";
import NoFilmsComponent from "./components/no-films.js";
import {render, RenderPosition} from "./utils.js";
import {generateFilms} from "./mock/film.js";
import {generateRank} from "./mock/rank-user.js";
import {generatePopupFilm} from "./mock/popup.js";
import {generateFilmsTop} from "./mock/film-top.js";
import {generateFilmsMostCommented} from "./mock/film-most-comment.js";
import {generateMainMenu} from "./mock/main-menu.js"; 
import {generateComments, generateEmogis} from "./mock/comments.js";

const FILM_COUNT = 18;
const FILM_TOP_COUNT = 2;
const FILM_MOST_COMMENTED_COUNT = 2;
const COMMENT_COUNT = 4;
const EMOGI_COUNT = 4;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilm = (filmsListContElement, filmNameComponent, film) => {
	const addPopup = () => {
		mainElement.appendChild(new PopupComponent(popups).getElement()); 

		const popupCloseButtonElement = document.querySelector(`.film-details__close-btn`);
		popupCloseButtonElement.addEventListener(`click`, removePopup);

		document.addEventListener(`keydown`, onEscKeyDown);

		const filmDetailsFormElement = document.querySelector(`.film-details__inner`);
		render(filmDetailsFormElement, new CommentsComponent(comments, emogis).getElement(), RenderPosition.BEFOREEND);
	};

	const removePopup = () => {
		const filmDetailsElement = document.querySelector(`.film-details`);
    mainElement.removeChild(filmDetailsElement); 

    document.removeEventListener(`keydown`, onEscKeyDown);
  };

	const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      removePopup();
    }
  };
  
	const filmComponent = new filmNameComponent(film);

	const posterCard = filmComponent.getElement().querySelector(`.film-card__poster`);
	const titleCard = filmComponent.getElement().querySelector(`.film-card__title`);
	const commentCard = filmComponent.getElement().querySelector(`.film-card__comments`);

	const areasClicks = [posterCard, titleCard, commentCard];
	
	areasClicks.forEach((areaClick) => {
		areaClick.addEventListener(`click`, addPopup);
	}); 

	render(filmsListContElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (filmsComponent, films) => {
	const isAllFilmsWatched = films.every((film) => film.isActiveWatched);

  if (isAllFilmsWatched) {
    render(filmsComponent.getElement(), new NoFilmsComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }


	render(filmsComponent.getElement(), new FilmsListComponent().getElement(), RenderPosition.BEFOREEND);

	const filmsElement = mainElement.querySelector(`.films`); 
	const filmsListElement = filmsComponent.getElement().querySelector(`.films-list`);
	const filmsListContElement = filmsComponent.getElement().querySelector(`.films-list__container`);

	let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
	films.slice(0, showingFilmsCount)
  	.forEach((film) => {
  		renderFilm(filmsListContElement, FilmComponent, film);
  	}); 


  render(filmsListElement, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);
	loadMoreButton.addEventListener(`click`, () => {
		const prevFilmsCount = showingFilmsCount;
	  showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

	  films.slice(prevFilmsCount, showingFilmsCount)
	    .forEach((film) => {
	  		renderFilm(filmsListContElement, FilmComponent, film);
	  	});

	  if (showingFilmsCount >= films.length) {
	    loadMoreButton.remove();
	  }
	});


	const filmsListTopRated = new FilmsListTopRatedComponent();
	const filmsListMostCommented = new FilmsListMostCommentedComponent();

	render(filmsElement, filmsListTopRated.getElement(), RenderPosition.BEFOREEND);
	render(filmsElement, filmsListMostCommented.getElement(), RenderPosition.BEFOREEND);

	const filmsListTopContElement = filmsListTopRated.getElement().querySelector(`.films-list__container`);
	const filmsListMostContElement = filmsListMostCommented.getElement().querySelector(`.films-list__container`);  

	filmsTop
		.forEach((film) => {
			renderFilm(filmsListTopContElement, FilmTopRatedComponent, film);
		});

	filmsMostCommented
  	.forEach((film) => {
  		renderFilm(filmsListMostContElement, FilmMostCommentedComponent, film);
  	});


	render(footerStatisticsElement, new FilmStatisticsComponent(statisticsValue).getElement(), RenderPosition.BEFOREEND);
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`); 

const ranks = generateRank();
const menu = generateMainMenu();
const films = generateFilms(FILM_COUNT);
const popups = generatePopupFilm();
const comments = generateComments(COMMENT_COUNT);
const emogis = generateEmogis(EMOGI_COUNT);
const filmsTop = generateFilmsTop(FILM_TOP_COUNT);
const filmsMostCommented = generateFilmsMostCommented(FILM_MOST_COMMENTED_COUNT);
const statisticsValue = 130291;

render(headerElement, new RankUserComponent(ranks).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new MainMenuComponent(menu).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

const filmsComponent = new FilmsComponent();
render(mainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);
renderBoard(filmsComponent, films);
