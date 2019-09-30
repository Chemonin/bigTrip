import {cities, optionItems, suffixByGroup, GroupType, PointType, dataByType} from '../data.js';
import AbstractComponent from './abstract-component.js';
import moment from 'moment';

export default class EventEdit extends AbstractComponent {
  constructor({photos, type, destination, eventTime, timeDuration, cost, options, description}) {
    super();
    this._photos = photos;
    this._destination = destination;
    this._eventTime = eventTime;
    console.log(this._eventTime);
    this._timeDuration = timeDuration;
    this._type = type;
    this._cost = cost;
    this._options = options;
    this._description = description;
  }

  formatData(timestamp) {
    return `${new Date(timestamp)
      .getDate()}.${new Date(timestamp).getMonth() + 1}.${new Date(timestamp)
      .getFullYear()} ${new Date(timestamp).toTimeString().substr(0, 5)}`;
  }

  getTemplate() {
    return `<form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" data-event-type="${this._type}" width="17" height="17" src="img/icons/${this._type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            ${Object.keys(GroupType).map((key) => `<fieldset class="event__type-group">
              <legend class="visually-hidden">${key}</legend>
              ${Object.values(PointType).filter((element) => dataByType[element].group === GroupType[key])
                .map((element) => `<div class="event__type-item">
                <input id="event-type-${element}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element}">
                <label class="event__type-label  event__type-label--${element}" for="event-type-${element}-1">${element}</label>
              </div>`).join(``)}
            </fieldset>`).join(``)}
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${this._type} ${suffixByGroup[dataByType[this._type].group]}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${cities.map((element) => `<option value="${element}"></option>`).join(``)}
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${moment(this._eventTime).format(`DD.MM.YYYY HH:MM`)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${moment(this._eventTime + this._timeDuration).format(`DD.MM.YYYY HH:MM`)}">
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._cost}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${this._options.map((element) => `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${optionItems[element.name]}" type="checkbox" name="event-offer-${optionItems[element.name]}" ${element.enable ? `checked` : ``}>
              <label class="event__offer-label" for="event-offer-${optionItems[element.name]}">
                <span class="event__offer-title">${element.name}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${element.price}</span>
              </label>
            </div>`).join(``)}
            </div>
          </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${this._description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${this._photos.map((element) => `<img class="event__photo" src="${element}" alt="Event photo">`).join(``)}
            </div>
          </div>
        </section>
      </section>
    </form>`;
  }
}
