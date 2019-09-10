import {createTripDay} from './components/trip-day.js';
import Event from './components/event.js';
import EventEdit from './components/event-edit.js';
import {createSorting} from './components/sorting.js';
import {createFilter} from './components/filter.js';
import {createMainMenuControls} from './components/main-menu-controls.js';
import {createTripInfo} from './components/trip-info.js';
import {createDaysList, createEventsList} from './components/content-lists.js';
import {pointsData, filtersNames, controlsNames} from './data.js';
import {render, unrender, Position} from './utils.js';

const mainControls = document.querySelector(`.trip-controls`);
const tripContainer = document.querySelector(`.trip-events`);

const renderElement = function (container, position, item) {
  container.insertAdjacentHTML(position, item);
};

renderElement(mainControls, `beforebegin`, createTripInfo(pointsData));
renderElement(mainControls, `afterbegin`, createMainMenuControls(controlsNames));
renderElement(mainControls, `beforeend`, createFilter(filtersNames));
renderElement(tripContainer, `afterbegin`, createSorting());
renderElement(tripContainer, `beforeend`, createDaysList());

const daysList = tripContainer.querySelector(`.trip-days`);
renderElement(daysList, `beforeend`, createTripDay());

const tripDay = daysList.querySelector(`.day`);
renderElement(tripDay, `beforeend`, createEventsList());

const eventsList = tripContainer.querySelector(`.trip-events__list`);

const renderPoint = (pointData) => {
  const point = new Event(pointData);
  const pointEdit = new EventEdit(pointData);

  point.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    eventsList.replaceChild(pointEdit.getElement(), point.getElement());
    pointEdit.getElement().querySelector(`form`).addEventListener(`submit`, () => {
      eventsList.replaceChild(point.getElement(), pointEdit.getElement());
    });
    pointEdit.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
      unrender(pointEdit.getElement());
      pointEdit.removeElement();
      point.removeElement();
    });
  });

  pointEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    eventsList.replaceChild(point.getElement(), pointEdit.getElement());
  });
  render(eventsList, point.getElement(), Position.BEFOREEND);
};

pointsData.forEach((dataItem) => renderPoint(dataItem));
