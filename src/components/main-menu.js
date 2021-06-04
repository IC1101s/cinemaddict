import AbstractComponent from "./abstract-component.js";

const createMainMenuMarkup = (name, count) => {
	return (
		`<a href="#${name}" class="main-navigation__item">${name} 
			<span class="main-navigation__item-count">
			  ${count}
			</span>
		</a>`
	);
};

const createMainMenuTemplate = (menu) => {
	const createMainMenu = menu.map((it) => createMainMenuMarkup(it.name, it.count)).join(`\n`);

	return (
		`<nav class="main-navigation">
	    <div class="main-navigation__items">
	      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
	    		${createMainMenu}
	    </div>
	    <a href="#stats" class="main-navigation__additional">Stats</a>
	  </nav>`
	);
};

export default class MainMenu extends AbstractComponent {
	constructor(menu) {
		super();
		
		this._menu = menu;
	}

	getTemplate() {
		return createMainMenuTemplate(this._menu);
	}
}
