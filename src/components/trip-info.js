import {month} from '../data.js';
const countTotalPrice = function (elementList) {
  const initialValue = 0;
  return elementList.reduce(function (previous, current) {
    let optionPrice = 0;
    if (current.options.length !== 0) {
      current.options.forEach(function (element) {
        if (element.enable) {
          optionPrice = optionPrice + element.price;
        }
      });
    }
    return previous + current.cost + optionPrice;
  }, initialValue);
};
export const createTripInfo = (pointsData) => {
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
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${countTotalPrice(pointsData)}</span>
    </p>
  </section>`;
};
