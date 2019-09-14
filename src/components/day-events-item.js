import AbstractComponent from './abstract-component.js';

export default class DayEventsItem extends AbstractComponent {
  getTemplate() {
    return `<li class="trip-events__item"></li>`;
  }
}
