import AbstractComponent from './abstract-component.js';

export default class MainMenuControls extends AbstractComponent {
  constructor(list) {
    super();
    this._list = list;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${this._list.map((element) => `<a class="trip-tabs__btn  ${element === `Table` ? `trip-tabs__btn--active` : ``}" href="#">${element}</a>`).join(``)}
    </nav>`;
  }
}
