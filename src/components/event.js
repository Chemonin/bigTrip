import {dataByType, suffixByGroup} from '../data.js';
import {formatTime} from '../utils.js';
import AbstractComponent from './abstract-component.js';
import moment from 'moment';
export default class Event extends AbstractComponent {
  constructor({type, destination, eventTime, timeDuration, cost, options}) {
    super();
    this._destination = destination;
    this._eventTime = eventTime;
    console.log(this._eventTime);
    this._timeDuration = timeDuration;
    this._type = type;
    this._cost = cost;
    this._options = options;
  }

  getTemplate() {
    return `<div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${this._type} ${suffixByGroup[dataByType[this._type].group]} ${this._destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${moment(this._eventTime).format(`DD.MM.YYYY HH:MM`)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${moment(this._eventTime + this._timeDuration).format(`DD.MM.YYYY HH:MM`)}</time>
          </p>
          <p class="event__duration">${formatTime(this._timeDuration)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._cost}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        ${this._options.length !== 0 ? `<ul class="event__selected-offers">
          ${this._options.map((item) => `<li class="event__offer">
            <span class="event__offer-title">${item.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
           </li>`).join(``)}
        </ul>` : ``}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>`;
  }
}
