import {month} from '../data.js';

export const createTripInfo = (pointsData) => {
  let initialValue = 0;
  const total = pointsData.reduce(function (previous, current) {
    let optionPrice = current.options.reduce(function (actual, next) {
      return actual + next.price;
    }, initialValue);
    return previous + current.cost + optionPrice;
  }, initialValue);
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${pointsData.length <= 3 ?
    `${pointsData.map((element) => element.destination).join(`-`)}` :
    `${pointsData[0].destination}-...-${pointsData[pointsData.length - 1].destination}`}</h1>

      <p class="trip-info__dates">${month[new Date(pointsData[0].eventTime)
        .getMonth()].substr(0, 3)} ${new Date(pointsData[0].eventTime)
        .getDate()}&nbsp;&mdash;&nbsp;${new Date(pointsData[pointsData.length - 1].eventTime).getDate()}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
    </p>
  </section>`;
};
