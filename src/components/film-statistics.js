export const createFilmStatisticsTemplate = (value) => {
	let test = value;

	if (typeof value !== 'string') {
		test = String(value);
	}

  return `<section class="footer__statistics">
      <p>${test} movies inside</p>
  </section>`;
};
