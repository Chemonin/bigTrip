import EventEdit from '../components/event-edit.js';
import Event from '../components/event.js';
import DayEventsItem from '../components/day-events-item.js';
import {Position, render, unrender} from '../utils.js';

export default class TripController {
  constructor(container, data) {
    this._container = container;
    this._event = new Event(data);
    this._eventEdit = new EventEdit(data);
    this._dayEventsItem = new DayEventsItem();
    this.create();
  }

  create() {
    this._event.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      this._dayEventsItem.getElement().replaceChild(this._eventEdit.getElement(), this._event.getElement());

      this._eventEdit.getElement().addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        this._dayEventsItem.getElement().replaceChild(this._event.getElement(), this._eventEdit.getElement());
        this._eventEdit.removeElement();
      });
      this._eventEdit.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
        unrender(this._eventEdit.getElement());
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
