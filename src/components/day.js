import AbstractComponent from './abstract-component.js';

export default class Day extends AbstractComponent {
  constructor(number, date) {
    super();
    this._number = number;
    this._date = date;
  }

  getTemplate() {
    return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${this._number}</span>
        <time class="day__date" datetime="2019-03-18">${this._date}</time>
      </div>
    </li>`;
  }
}
