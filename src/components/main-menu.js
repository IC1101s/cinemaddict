import AbstractComponent from "./abstract-component.js";

const createMainMenuMarkup = (menu, isActive) => {
	const {
		name, 
		count,
	} = menu; 

	let href = ``;
	
	if (isActive) {
		href = name.slice(0, 3).toLowerCase();
	} else {
		href = name.toLowerCase();
	}

	return (
		`<a href="#${href}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">
			${isActive ? `${name}` : `${name} <span class="main-navigation__item-count">${count}</span>`}  
		</a>`
	);
};

const createMainMenuTemplate = (menu) => {
	const createMainMenu = menu.map((it, index) => createMainMenuMarkup(it, index === 0)).join(`\n`);

	return (
		`<nav class="main-navigation">
	    <div class="main-navigation__items">
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
