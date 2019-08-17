import {createTripDay} from './components/trip-day.js';
import {createEvent} from './components/event.js';
import {createEventEdit} from './components/event-edit.js';
import {createSorting} from './components/sorting.js';
import {createFilter} from './components/filter.js';
import {createMainMenuControls} from './components/main-menu-controls.js';
import {createRoute} from './components/route.js';
import {createDaysList, createEventsList} from './components/content-lists.js';

const tripInfo = document.querySelector(`.trip-info`);
const mainMenu = document.querySelector(`.trip-controls`);
const tripContainer = document.querySelector(`.trip-events`);

const renderElement = function (container, position, item) {
  container.insertAdjacentHTML(position, item);
};

renderElement(tripInfo, `afterbegin`, createRoute());
renderElement(mainMenu, `afterbegin`, createMainMenuControls());
renderElement(mainMenu, `afterbegin`, createFilter());
renderElement(tripContainer, `afterbegin`, createSorting());
renderElement(tripContainer, `beforeend`, createDaysList());

const daysList = tripContainer.querySelector(`.trip-days`);
renderElement(daysList, `beforeend`, createTripDay());

const tripDay = daysList.querySelector(`.day`);
renderElement(tripDay, `beforeend`, createEventsList());

const eventsList = tripContainer.querySelector(`.trip-events__list`);
renderElement(eventsList, `afterbegin`, createEventEdit());
renderElement(eventsList, `beforeend`, createEvent());
