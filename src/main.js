import {createFilter} from './components/filter.js';
import {createMainMenuControls} from './components/main-menu-controls.js';
import {createTripInfo} from './components/trip-info.js';
import {pointsData, filtersNames, controlsNames} from './data.js';
import TripController from './controller/trip-controller.js';

const mainControls = document.querySelector(`.trip-controls`);
const tripContainer = document.querySelector(`.trip-events`);

const renderElement = function (container, position, item) {
  container.insertAdjacentHTML(position, item);
};

renderElement(mainControls, `beforebegin`, createTripInfo(pointsData));
renderElement(mainControls, `afterbegin`, createMainMenuControls(controlsNames));
renderElement(mainControls, `beforeend`, createFilter(filtersNames));

const tripController = new TripController(tripContainer, pointsData);
tripController.init();
