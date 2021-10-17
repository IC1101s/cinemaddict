const mainMenuNames = [
	`All movies`, `Watchlist`, `History`, `Favorites`
];

const generateMainMenu = () => {
	return mainMenuNames.map((it) => {	
		return {
			name: it,
			count: Math.floor(Math.random() * 18),
		};
	});
};

export {generateMainMenu};
