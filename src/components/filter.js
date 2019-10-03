import AbstractComponent from './abstract-component.js';

export default class Filter extends AbstractComponent {
  constructor(list) {
    super();
    this._list = list;
  }

  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">
      ${this._list.map((element) => `<div class="trip-filters__filter">
        <input id="filter-${element}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${element}" checked>
        <label class="trip-filters__filter-label" for="filter-${element}">${element}</label>
      </div>`).join(``)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
  }
}
