import DOMPurify from 'dompurify';

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = DOMPurify.sanitize(template);
  return newElement.firstChild;
};

export const formatTime = function (timestamp) {
  const formatDuration = (time) => ({
    'D': Math.floor(time / 86400000),
    'H': time.getUTCHours(),
    'M': time.getUTCMinutes()
  });
  const duration = formatDuration(new Date(timestamp));
  return `${Object.keys(duration).map((key) => duration[key] > 0 ? `${duration[key]}${key}` : ``).join(` `)}`;
};

export const render = (parent, child, position) => {
  switch (position) {
    case Position.AFTERBEGIN:
      parent.prepend(child);
      break;
    case Position.BEFOREEND:
      parent.append(child);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
