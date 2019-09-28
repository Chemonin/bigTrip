import EventEdit from '../components/event-edit.js';
import Event from '../components/event.js';
import DayEventsItem from '../components/day-events-item.js';
import {Position, render, unrender} from '../utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
// import moment from 'moment';
// import {pointsData} from '../data.js';

export default class EventController {
  constructor(container, data, onDataChange) {
    // this._data = data; // для удаления данных точки из массива
    this._container = container;
    this._data = data;
    this._event = new Event(data);
    this._eventEdit = new EventEdit(data);
    this._dayEventsItem = new DayEventsItem();
    this._onDataChange = onDataChange;
    this._changes = {};
    this.create();
  }

  create() {
    const dateStart = flatpickr(this._eventEdit.getElement().querySelector(`#event-start-time-1`), {
      onChange: (selectedDate) => {
        dateEnd.set(`minDate`, selectedDate[0]);
        dateEnd.set(`minTime`, selectedDate[0]);
      },
      altInput: true,
      altFormat: `d.n.Y G:i`,
      allowInput: true,
      enableTime: true,
      time_24hr: true, // eslint-disable-line
      defaultDate: this._data.eventTime
    });
    const dateEnd = flatpickr(this._eventEdit.getElement().querySelector(`#event-end-time-1`), {
      onChange: (selectedDate) => {
        dateStart.set(`maxDate`, selectedDate[0]);
        dateStart.set(`maxTime`, selectedDate[0]);
      },
      altInput: true,
      altFormat: `d.n.Y G:i`,
      allowInput: true,
      enableTime: true,
      time_24hr: true, // eslint-disable-line
      defaultDate: this._data.eventTime + this._data.timeDuration
    });
    this._event.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      this._dayEventsItem.getElement().replaceChild(this._eventEdit.getElement(), this._event.getElement());
      this._eventEdit.getElement().querySelector(`.event__type-list`).addEventListener(`click`, (evt) => {
        if (evt.target.nodeName.toLowerCase() === `input`) {
          this._eventEdit.getElement().querySelector(`.event__type-icon`).dataset.eventType = evt.target.value;
          this._eventEdit.getElement().querySelector(`.event__type-icon`).src = `./img/icons/${evt.target.value}.png`;
          this._changes.type = evt.target.value;
        }
      });
      this._eventEdit.getElement().addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        this._dayEventsItem.getElement().replaceChild(this._event.getElement(), this._eventEdit.getElement());
        this._eventEdit.removeElement();
        const formData = new FormData(this._eventEdit.getElement());
        this._changes.eventTime = new Date(formData.get(`event-start-time`)).getTime();
        this._changes.eventEndTIme = formData.get(`event-end-time`);
      });
      this._eventEdit.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
        unrender(this._eventEdit.getElement());
        // pointsData.splice([pointsData.findIndex((it) => it === this._data)], 1); // для удаления данных точки из массива
        this._eventEdit.removeElement();
        this._event.removeElement();
      });

      this._eventEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
        this._dayEventsItem.getElement().replaceChild(this._event.getElement(), this._eventEdit.getElement());
        this._eventEdit.removeElement();
      });
    });

    render(this._container, this._dayEventsItem.getElement(), Position.BEFOREEND);
    render(this._dayEventsItem.getElement(), this._event.getElement(), Position.BEFOREEND);
  }
}
