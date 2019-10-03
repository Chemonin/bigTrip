import Filter from './components/filter.js';
import MainMenuControls from './components/main-menu-controls.js';
import TripInfo from './components/trip-info.js';
import {Position, render, unrender} from './utils.js';
import {pointsData, filtersNames, controlsNames} from './data.js';
import TripController from './controller/trip-controller.js';

const mainHeader = document.querySelector(`.trip-main`);
const mainControls = document.querySelector(`.trip-controls`);
const tripContainer = document.querySelector(`.trip-events`);
const tripInfo = new TripInfo(pointsData);
const mainMenuControls = new MainMenuControls(controlsNames);
const filter = new Filter(filtersNames);
const tripController = new TripController(tripContainer, pointsData);

render(mainHeader, tripInfo.getElement(), Position.AFTERBEGIN);
render(mainControls, mainMenuControls.getElement(), Position.AFTERBEGIN);
render(mainControls, filter.getElement(), Position.BEFOREEND);
tripController.init();
