export const createMainMenuControls = (list) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${list.map((element) => `<a class="trip-tabs__btn  ${element === `Table` ? `trip-tabs__btn--active` : ``}" href="#">${element}</a>`).join(``)}
  </nav>`;
};
