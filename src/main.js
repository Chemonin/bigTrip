import {createTripDay} from './components/trip-day.js';
import {createEvent} from './components/event.js';
import {createEventEdit} from './components/event-edit.js';
import {createSorting} from './components/sorting.js';
import {createFilter} from './components/filter.js';
import {createMainMenuControls} from './components/main-menu-controls.js';
import {createTripInfo} from './components/trip-info.js';
import {createDaysList, createEventsList} from './components/content-lists.js';
import {pointsData, filtersNames, controlsNames} from './data.js';

let count = 0;

// const tripInfo = document.querySelector(`.trip-info`);
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
const createPointsList = (list, startIndex) => list.slice(startIndex).map(createEvent).join(``);

renderElement(eventsList, `afterbegin`, createEventEdit(pointsData[count++]));
renderElement(eventsList, `beforeend`, createPointsList(pointsData, count));
