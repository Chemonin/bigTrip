import DaysList from '../components/days-list.js';
import DayEvents from '../components/day-events.js';
import DayEventsItem from '../components/day-events-item.js';
import Day from '../components/day.js';
import {Position, render} from '../utils.js';
import Sorting from '../components/sorting.js';
import EventController from './event-controller.js';

export default class TripController {
  constructor(container, points) {
    this._container = container;
    this._points = points;
    this._sorting = new Sorting();
    this._daysList = new DaysList();
    this._dayEvents = new DayEvents();
    this._dayEventsItem = new DayEventsItem();
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
      this._points.slice().filter((point) => new Date(point.eventTime).toString().substr(4, 6) === date);
      dayPoints.forEach((point) => new EventController(dayEvents.getElement(), point));
    });
  }

  init() {
    render(this._container, this._sorting.getElement(), Position.BEFOREEND);
    render(this._container, this._daysList.getElement(), Position.BEFOREEND);
    this._renderDay(this._points);
  }
}
