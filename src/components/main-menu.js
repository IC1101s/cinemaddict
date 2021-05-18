import {createElement} from "../utils.js";

const createMainMenuMarkup = (name, count) => {
	return `<a href="#${name}" class="main-navigation__item">${name} 
		<span class="main-navigation__item-count">
		  ${count}
		</span>
	</a>`
};

const createMainMenuTemplate = (menu) => {
	const createMainMenu = menu.map((it) => createMainMenuMarkup(it.name, it.count)).join(`\n`);

	return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    	${createMainMenu}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MainMenu {
	constructor(menu) {
		this._menu = menu;
		this._element = null;
	}

	getTemplate() {
		return createMainMenuTemplate(this._menu);
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
