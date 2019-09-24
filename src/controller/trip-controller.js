import DaysList from '../components/days-list.js';
import DayEvents from '../components/day-events.js';
import DayEventsItem from '../components/day-events-item.js';
import Day from '../components/day.js';
import {Position, render} from '../utils.js';
import Sorting from '../components/sorting.js';
import EventController from './event-controller.js';
const CLEAR_DATE = ``;

export default class TripController {
  constructor(container, points) {
    this._container = container;
    this._points = points;
    this._sorting = new Sorting();
    this._daysList = new DaysList();
    this._dayEvents = new DayEvents();
    this._dayEventsItem = new DayEventsItem();
    this._day = new Day(CLEAR_DATE, CLEAR_DATE);
  }

  _renderDay(pointsData) {
    let dayCount = 0;
    const dates = new Set(pointsData.map((point) => new Date(point.eventTime).toString().substr(4, 6)));
    dates.forEach((date) => {
      const dayPoints = this._points.slice().filter((point) => new Date(point.eventTime).toString().substr(4, 6) === date);
      dayCount++;
      const day = new Day(dayCount, date);
      const dayEvents = new DayEvents();
      render(this._daysList.getElement(), day.getElement(), Position.BEFOREEND);
      render(day.getElement(), dayEvents.getElement(), Position.BEFOREEND);
      dayPoints.forEach((point) => new EventController(dayEvents.getElement(), point));
    });
  }

  _onSortingLabelClick(evt) {
    if (evt.target.tagName !== `LABEL`) {
      return;
    }
    this._sorting.getElement().querySelector(`.trip-sort__item--day`).textContent = ``;
    this._daysList.getElement().innerHTML = ``;
    switch (evt.target.dataset.sortType) {
      case `time`:
        this._dayEvents.getElement().innerHTML = ``;
        const sortedByTime = this._points.slice().sort((a, b) => b.eventTime - a.eventTime);
        render(this._daysList.getElement(), this._day.getElement(), Position.BEFOREEND);
        render(this._day.getElement(), this._dayEvents.getElement(), Position.BEFOREEND);
        sortedByTime.forEach((sortingItem) => new EventController(this._dayEvents.getElement(), sortingItem));
        break;
      case `price`:
        this._dayEvents.getElement().innerHTML = ``;
        const sortedByPrice = this._points.slice().sort((a, b) => b.cost - a.cost);
        render(this._daysList.getElement(), this._day.getElement(), Position.BEFOREEND);
        render(this._day.getElement(), this._dayEvents.getElement(), Position.BEFOREEND);
        sortedByPrice.forEach((sortingItem) => new EventController(this._dayEvents.getElement(), sortingItem));
        break;
      case `default`:
        this._sorting.getElement().querySelector(`.trip-sort__item--day`).textContent = `day`;
        this._renderDay(this._points);
        break;
    }
  }

  init() {
    render(this._container, this._sorting.getElement(), Position.BEFOREEND);
    render(this._container, this._daysList.getElement(), Position.BEFOREEND);
    this._sorting.getElement().addEventListener(`click`, (evt) => this._onSortingLabelClick(evt));
    this._renderDay(this._points);
  }
}
