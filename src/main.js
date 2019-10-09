import Filter from './components/filter.js';
import MainMenuControls from './components/main-menu-controls.js';
import TripInfo from './components/trip-info.js';
import {Position, render} from './utils.js';
import {pointsData, filtersNames, controlsNames} from './data.js';
import TripController from './controller/trip-controller.js';
import Statistics from './components/statistics.js';

const mainHeader = document.querySelector(`.trip-main`);
const mainControls = document.querySelector(`.trip-controls`);
const tripContainer = document.querySelector(`.trip-events`);
const mainContainer = document.querySelector(`.page-main`).querySelector(`.page-body__container`);
const tripInfo = new TripInfo(pointsData);
const mainMenuControls = new MainMenuControls(controlsNames);
const filter = new Filter(filtersNames);
const tripController = new TripController(tripContainer, pointsData);
const statistics = new Statistics();
statistics.getElement().classList.add(`visually-hidden`);

render(mainHeader, tripInfo.getElement(), Position.AFTERBEGIN);
render(mainControls, mainMenuControls.getElement(), Position.AFTERBEGIN);
render(mainControls, filter.getElement(), Position.BEFOREEND);
render(mainContainer, statistics.getElement(), Position.BEFOREEND);
tripController.init();

mainHeader.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  evt.currentTarget.querySelectorAll(`a`).forEach((element) => {
    if (element.classList.contains(`trip-tabs__btn--active`)) {
      element.classList.remove(`trip-tabs__btn--active`);
    }
  });
  switch (evt.target.textContent) {
    case `Table`:
      evt.target.classList.add(`trip-tabs__btn--active`);
      statistics.getElement().classList.add(`visually-hidden`);
      tripController.show();
      break;
    case `Stats`:
      evt.target.classList.add(`trip-tabs__btn--active`);
      statistics.getElement().classList.remove(`visually-hidden`);
      tripController.hide();
      break;
    case `New event`:
      evt.currentTarget.querySelectorAll(`a`).forEach((element) => {
        if (element.textContent === `Table`) {
          element.classList.add(`trip-tabs__btn--active`);
        }
      });
      statistics.getElement().classList.add(`visually-hidden`);
      tripController.show();
      break;
  }
});
