import {pointTypes} from '../data.js';
const formatTime = function (timestamp) {
  const formatDuration = (time) => ({
    'D': Math.floor(time / 86400000),
    'H': time.getUTCHours(),
    'M': time.getUTCMinutes()
  });
  const duration = formatDuration(new Date(timestamp));
  return `${Object.keys(duration).map((key) => duration[key] > 0 ? `${duration[key]}${key}` : ``).join(` `)}`;
};
export const createEvent = ({type, destination, eventTime, timeDuration, cost, options}) => {
  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${pointTypes[type]} ${destination}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${new Date(eventTime).toTimeString().substr(0, 5)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${new Date(eventTime + timeDuration).toTimeString().substr(0, 5)}</time>
        </p>
        <p class="event__duration">${formatTime(timeDuration)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${cost}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      ${options.length !== 0 ? `<ul class="event__selected-offers">
        ${options.map((item) => `<li class="event__offer">
          <span class="event__offer-title">${item.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
         </li>`).join(``)}
      </ul>` : ``}

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};
