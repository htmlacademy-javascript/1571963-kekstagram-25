import {getRandomInRange} from './util.js';
import {ACTIVE_FILTER_BUTTON, RERENDER_DELAY} from './const.js';
import {fillMainPage} from './picture.js';


const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');

const toggleButtonClass = (buttons, evt, activeFilterButton) => {
  buttons.forEach((button)=> {
    button.classList.remove(activeFilterButton);
  });
  if (evt.target) {
    evt.target.classList.add(activeFilterButton);
  }
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const compareLikesCount = (a, b) => a.comments.length - b.comments.length;


const deleteMiniatures = () => {
  const miniatures = document.querySelectorAll('.picture');
  miniatures.forEach((picture) => picture.remove());
};

const applyRandomFilter = (data) => {
  const miniaturesId = [];
  while (miniaturesId.length < 10) {
    const filter = getRandomInRange(0, (data.length - 1));
    if (miniaturesId.includes(filter) === false) {
      miniaturesId.push(filter);
    }
  }
  const randomMiniatures = [];
  miniaturesId.forEach((element) => {
    randomMiniatures.push(data[element]);
  });
  fillMainPage(randomMiniatures);
};


const applyDiscussedFilter = (miniatures) => {
  fillMainPage(miniatures.slice().sort(compareLikesCount));};


const onFilterButtonClick = (filterId, miniatures) => {
  switch (filterId){
    case 'filter-random':
      deleteMiniatures();
      applyRandomFilter(miniatures);
      break;
    case 'filter-discussed':
      deleteMiniatures();
      applyDiscussedFilter(miniatures);
      break;
    default:
      deleteMiniatures();
      fillMainPage(miniatures);
      break;
  }
};


const filterMiniatures = (miniatures) => {
  const handleChange = debounce((evt) => onFilterButtonClick(evt.target.id, miniatures), RERENDER_DELAY);
  filtersForm.addEventListener('click', (evt) => {toggleButtonClass(filterButtons, evt, ACTIVE_FILTER_BUTTON);
    handleChange(evt);
  });
};

export {filterMiniatures};
