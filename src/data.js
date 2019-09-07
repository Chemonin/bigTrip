const TIME_INTERVAL = 259200000;
const MAX_DURATION = 18000000;
const MAX_COST = 1000;
const NUMBER_OF_POINT = 4;
export const month = {
  0: `January`,
  1: `February`,
  2: `March`,
  3: `April`,
  4: `May`,
  5: `June`,
  6: `July`,
  7: `August`,
  8: `September`,
  9: `October`,
  10: `November`,
  11: `December`,
};
const getPointsData = (count) => new Array(count).fill(``).map(getPoint);
const getRandomElement = (element) => element[Math.floor(Math.random() * element.length)];
const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const pointTypes = [`taxi`, `bus`, `train`, `ship`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
const cities = [`Moscow`, `London`, `Paris`, `New-York`, `Tokio`];
const descriptionPhrases = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus`];
const optionsName = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`];
export const getPoint = () => ({
  type: getRandomElement(pointTypes),
  destination: getRandomElement(cities),
  photos: new Array(5).fill(``).map((element) => {
    element = `http://picsum.photos/300/150?r=${Math.random()}`;
    return element;
  }),
  description: new Array(randomInteger(1, 3)).fill(getRandomElement(descriptionPhrases)).join(` `),
  eventTime: Date.now() + Math.floor(Math.random() * TIME_INTERVAL),
  timeDuration: Math.floor(Math.random() * MAX_DURATION),
  cost: Math.floor(Math.random() * MAX_COST),
  options: new Array(Math.floor(Math.random() * 3)).fill(``).map((element) => {
    element = {name: getRandomElement(optionsName), price: Math.floor(Math.random() * 200), enable: true};
    return element;
  })
});

export const pointsData = getPointsData(NUMBER_OF_POINT).sort((first, second) => first.eventTime - second.eventTime);
export const filtersNames = [`everything`, `future`, `past`];
export const controlsNames = [`Table`, `Stats`];
