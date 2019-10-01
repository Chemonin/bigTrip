import DaysList from '../components/days-list.js';
import DayEvents from '../components/day-events.js';
import DayEventsItem from '../components/day-events-item.js';
import Day from '../components/day.js';
import {Position, render, unrender} from '../utils.js';
import Sorting from '../components/sorting.js';
import EventController from './event-controller.js';
import {countTotalPrice, createRootName} from '../components/trip-info.js';
import moment from 'moment';
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
    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }

  _renderDay(pointsData) {
    let dayCount = 0;
    unrender(this._daysList.getElement());
    this._daysList.removeElement();
    render(this._container, this._daysList.getElement(), Position.BEFOREEND);
    const dates = new Set(pointsData.sort((a, b) => {
      return a.eventTime - b.eventTime;
    }).map((point) => new Date(point.eventTime).toString().substr(4, 6)));
    dates.forEach((date) => {
      const dayPoints = this._points.slice().filter((point) => new Date(point.eventTime).toString().substr(4, 6) === date);
      dayCount++;
      const day = new Day(dayCount, date);
      const dayEvents = new DayEvents();
      render(this._daysList.getElement(), day.getElement(), Position.BEFOREEND);
      render(day.getElement(), dayEvents.getElement(), Position.BEFOREEND);
      dayPoints.forEach((point) => this._renderEvent(dayEvents.getElement(), point));
    });
  }

  _renderEvent(container, pointData) {
    const eventController = new EventController(container, pointData, this._onDataChange, this._onChangeView);
    this._subscriptions.push(eventController.setDefaultView.bind(eventController));
  }
  _onDataChange(newData, oldData) {
    this._points[this._points.findIndex((it) => it === oldData)] = newData;
    document.querySelector(`.trip-info__cost-value`).textContent = countTotalPrice(this._points);
    document.querySelector(`.trip-info__title`).textContent = createRootName(this._points);
    document.querySelector(`.trip-info__dates`).textContent = `${moment(this._points[0].eventTime)
      .format(`MMM DD`)}\u00A0\u2014\u00A0${moment(this._points[this._points.length - 1].eventTime).format(`MMM DD`)}`;
    this._renderDay(this._points);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
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
        sortedByTime.forEach((sortingItem) => this._renderEvent(this._dayEvents.getElement(), sortingItem));
        break;
      case `price`:
        this._dayEvents.getElement().innerHTML = ``;
        const sortedByPrice = this._points.slice().sort((a, b) => b.cost - a.cost);
        render(this._daysList.getElement(), this._day.getElement(), Position.BEFOREEND);
        render(this._day.getElement(), this._dayEvents.getElement(), Position.BEFOREEND);
        sortedByPrice.forEach((sortingItem) => this._renderEvent(this._dayEvents.getElement(), sortingItem));
        break;
      case `default`:
        this._sorting.getElement().querySelector(`.trip-sort__item--day`).textContent = `day`;
        this._renderDay(this._points);
        break;
    }
  }

  init() {
    render(this._container, this._sorting.getElement(), Position.BEFOREEND);
    this._sorting.getElement().addEventListener(`click`, (evt) => this._onSortingLabelClick(evt));
    this._renderDay(this._points);
  }
}
