import moment from 'moment';
import AbstractComponent from './abstract-component.js';

export const countTotalPrice = function (elementList) {
  const initialValue = 0;
  return elementList.reduce(function (previous, current) {
    let optionPrice = 0;
    if (current.options.length !== 0) {
      current.options.forEach(function (element) {
        if (element.enable) {
          optionPrice = optionPrice + parseInt(element.price, 10);
        }
      });
    }
    return previous + parseInt(current.cost, 10) + optionPrice;
  }, initialValue);
};

export const createRootName = function (data) {
  const cities = new Set(data.reduce((acc, curr) => {
    return [...acc, curr.destination];
  }, []));
  if (cities.size <= 3) {
    return Array.from(cities).map((element) => element).join(`-`);
  } else {
    return `${Array.from(cities)[0]}-...-${Array.from(cities).pop()}`;
  }
};

const createRootDate = function (data) {
  return `${moment(data[0].eventTime)
    .format(`MMM DD`)}&nbsp;&mdash;&nbsp;${moment(data[data.length - 1].eventTime).format(`MMM DD`)}`;
};

export default class TripInfo extends AbstractComponent {
  constructor(pointsData) {
    super();
    this._pointsData = pointsData;
  }
  getTemplate() {
    return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${createRootName(this._pointsData)}</h1>

        <p class="trip-info__dates">${createRootDate(this._pointsData)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${countTotalPrice(this._pointsData)}</span>
      </p>
    </section>`;
  }
}
