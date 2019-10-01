import EventEdit from '../components/event-edit.js';
import Event from '../components/event.js';
import DayEventsItem from '../components/day-events-item.js';
import {Position, render, unrender} from '../utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import moment from 'moment';

export default class EventController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._event = new Event(data);
    this._eventEdit = new EventEdit(data);
    this._dayEventsItem = new DayEventsItem();
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._changes = {};
    this.create();
  }

  create() {
    this._event.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {

      const dateStart = flatpickr(this._eventEdit.getElement().querySelector(`#event-start-time-1`), {
        onChange: (selectedDate) => {
          dateEnd.set(`minDate`, selectedDate[0]);
          dateEnd.set(`minTime`, selectedDate[0]);
        },
        altInput: true,
        altFormat: `d.n.Y H:i`,
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
        altFormat: `d.n.Y H:i`,
        allowInput: true,
        enableTime: true,
        time_24hr: true, // eslint-disable-line
        defaultDate: this._data.eventTime + this._data.timeDuration
      });
      this._onChangeView();
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
        const formData = new FormData(this._eventEdit.getElement());
        this._changes.type = this._eventEdit.getElement().querySelector(`.event__type-icon`).dataset.eventType;
        this._changes.eventTime = +moment(formData.get(`event-start-time`), `YYYY-MM-DD HH:mm`);
        this._changes.timeDuration = moment(formData.get(`event-end-time`), `YYYY-MM-DD HH:mm`).valueOf() - moment(formData.get(`event-start-time`), `YYYY-MM-DD HH:mm`).valueOf();
        this._changes.eventFavorite = (formData.get(`event-favorite`)) ? true : false;
        this._changes.cost = formData.get(`event-price`);
        this._changes.destination = formData.get(`event-destination`);
        this._changes.description = this._eventEdit.getElement().querySelector(`.event__destination-description`).textContent;
        const offers = Array.from(this._eventEdit.getElement().querySelectorAll(`.event__offer-label`));
        if (offers.length !== 0) {
          this._changes.options = offers.reduce((acc, elem) => {
            const option = {
              name: elem.querySelector(`.event__offer-title`).textContent,
              price: elem.querySelector(`.event__offer-price`).textContent,
              enable: formData.get(elem.getAttribute(`for`)) === `on` ? true : false,
            };
            return [...acc, option];
          }, []);
        } else {
          this._changes.options = [];
        }
        this._changes.photos = Array.from(this._eventEdit.getElement().querySelectorAll(`.event__photo`))
          .map((item) => item.getAttribute(`src`));
        this._dayEventsItem.getElement().replaceChild(this._event.getElement(), this._eventEdit.getElement());
        this._eventEdit.removeElement();
        this._onDataChange(this._changes, this._data);
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

  setDefaultView() {
    if (this._dayEventsItem.getElement().contains(this._eventEdit.getElement())) {
      this._dayEventsItem.getElement().replaceChild(this._event.getElement(), this._eventEdit.getElement());
    }
  }
}
