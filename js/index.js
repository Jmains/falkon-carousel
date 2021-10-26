const carouselImages = [
  {
    url: "https://unsplash.it/800/800?image=22",
    alt: "January",
    text: "January",
  },
  {
    url: "https://unsplash.it/800/800?image=43",
    alt: "February",
    text: "February",
  },
  {
    url: "https://unsplash.it/800/800?image=54",
    alt: "March",
    text: "March",
  },
  {
    url: "https://unsplash.it/800/800?image=75",
    alt: "April",
    text: "April",
  },
  {
    url: "https://unsplash.it/800/800?image=88",
    alt: "May",
    text: "May",
  },
  {
    url: "https://unsplash.it/800/800?image=99",
    alt: "June",
    text: "June",
  },
  {
    url: "https://unsplash.it/800/800?image=84",
    alt: "July",
    text: "July",
  },
  {
    url: "https://unsplash.it/800/800?image=91",
    alt: "August",
    text: "August",
  },
  {
    url: "https://unsplash.it/800/800?image=92",
    alt: "September",
    text: "September",
  },
  {
    url: "https://unsplash.it/800/800?image=83",
    alt: "October",
    text: "October",
  },
  {
    url: "https://unsplash.it/800/800?image=79",
    alt: "November",
    text: "November",
  },
  {
    url: "https://unsplash.it/800/800?image=14",
    alt: "December",
    text: "December",
  },
];

const createCarouselItems = (carouselImages) => {
  let carouselInnerContainer = document.getElementById("carouselInnerContainer");

  const carouselListItemClassName = "carousel__item";
  const carouselImgClassName = "carousel__img";
  const carouselImgTextClassName = "carousel__img-text";

  for (const img of carouselImages) {
    let carouselListItem = document.createElement("li");
    carouselListItem.classList.add(carouselListItemClassName);

    let carouselImg = document.createElement("img");
    carouselImg.src = img.url;
    carouselImg.alt = img.alt;
    carouselImg.classList.add(carouselImgClassName);

    let carouselImgText = document.createElement("p");
    carouselImgText.innerHTML = img.text;
    carouselImgText.classList.add(carouselImgTextClassName);

    carouselListItem.appendChild(carouselImg);
    carouselListItem.appendChild(carouselImgText);

    carouselInnerContainer.appendChild(carouselListItem);
  }
};

const createDropdownItems = (carouselImages) => {
  let dropdown = document.getElementById("dropdown");

  const dropdownListItemClassName = "nav__dropdown-item";
  const dropdownListItemBtnClassName = "nav__dropdown-item-btn";

  for (const img of carouselImages) {
    let dropdownListItem = document.createElement("li");
    dropdownListItem.classList.add(dropdownListItemClassName);

    let dropdownListItemBtn = document.createElement("button");
    dropdownListItemBtn.innerText = img.text;
    dropdownListItemBtn.ariaLabel = `view ${img.text} image`;
    dropdownListItemBtn.classList.add(dropdownListItemBtnClassName);

    dropdownListItem.appendChild(dropdownListItemBtn);

    dropdown.appendChild(dropdownListItem);
  }
};

// TODO: Maybe programmatically populate drop down list indicators

createCarouselItems(carouselImages);
createDropdownItems(carouselImages);

/*
 *********** Start Dropdown Functionality ***********
 */
const navContainer = document.getElementById("navContainer");
const dropdownToggleBtn = document.getElementById("dropdownToggleBtn");
const dropdown = document.getElementById("dropdown");

const showDropdownClassName = "nav__dropdown--show";

// Added and removed z index because visibilty hidden still applied z-index to
// dropdown disabling carousel next button click

const hideDropdown = () => {
  navContainer.style.zIndex = 0;
  dropdown.classList.remove(showDropdownClassName);
  dropdown.ariaExpanded = false;
};

const showDropdown = () => {
  navContainer.style.zIndex = 50;
  dropdown.classList.add(showDropdownClassName);
  dropdown.ariaExpanded = true;
};

const handleDropdownClick = () => {
  if (dropdown.classList.contains(showDropdownClassName)) {
    hideDropdown();
  } else {
    showDropdown();
  }
};

const handleDropdownEscape = (ev) => {
  if (ev.key === "Esc" || ev.key === "Escape") {
    hideDropdown();
  }
};

dropdownToggleBtn.addEventListener("click", () => {
  handleDropdownClick();
});

document.addEventListener("keydown", handleDropdownEscape);
/*
 *********** End Dropdown Functionality ***********
 */

/*
 *********** Start Carousel Functionality ***********
 */

let prevItem, currItem, nextItem;
let currentCarouselItemIdx = 0;

const transitionDirections = {
  LEFT: "left",
  RIGHT: "right",
};

// Carousel DOM elements
const carouselItems = document.getElementsByClassName("carousel__item");
const carouselNextBtn = document.getElementById("carouselNextBtn");
const carouselPrevBtn = document.getElementById("carouselPreviousBtn");

// Carousel ClassNames
const activeCarouselItemClassName = "carousel__item--active";
const slideCarouselItemLeftClassName = "carousel__item--next";
const slideCarouselItemRightClassName = "carousel__item--prev";
const carouselPositionNextItemClassName = "carousel__item--setnext";
const carouselPositionPrevItemClassName = "carousel__item--setprev";

// Dropdown ClassNames
const activeDropdownItemBtnClassName = "nav__dropdown-item-btn--active";

// Dropdown DOM element
const dropdownItemBtns = document.getElementsByClassName("nav__dropdown-item-btn");

const totalCarouselItems = carouselItems.length;

// TODO: Maybe refactor updateCarouselItemPositions to return carousel items state instead of global being a global variable
// TODO: Disable buttons while carousel items are transitioning so setTimeout doesn't get out of sync

const updateCarouselItemPositions = (currCarouselItemIdx) => {
  // Remove all style positions if they exist in any current carousel direction
  if (
    prevItem?.classList.contains(carouselPositionPrevItemClassName) &&
    currItem?.classList.contains(activeCarouselItemClassName) &&
    nextItem?.classList.contains(carouselPositionNextItemClassName)
  ) {
    prevItem.classList.remove(carouselPositionPrevItemClassName);
    currItem.classList.remove(activeCarouselItemClassName);
    nextItem.classList.remove(carouselPositionNextItemClassName);
  }

  // If first item
  if (currCarouselItemIdx === 0) {
    prevItem = carouselItems[totalCarouselItems - 1];
    currItem = carouselItems[currCarouselItemIdx];
    nextItem = carouselItems[currCarouselItemIdx].nextElementSibling;
  } // If last item
  else if (currCarouselItemIdx === totalCarouselItems - 1) {
    prevItem = carouselItems[currCarouselItemIdx].previousElementSibling;
    currItem = carouselItems[currCarouselItemIdx];
    nextItem = carouselItems[0];
  } else {
    prevItem = carouselItems[currCarouselItemIdx].previousElementSibling;
    currItem = carouselItems[currCarouselItemIdx];
    nextItem = carouselItems[currCarouselItemIdx].nextElementSibling;
  }

  prevItem.classList.add(carouselPositionPrevItemClassName);
  currItem.classList.add(activeCarouselItemClassName);
  nextItem.classList.add(carouselPositionNextItemClassName);

  return currCarouselItemIdx;
};

// Set initial state of the carousel items
currentCarouselItemIdx = updateCarouselItemPositions(currentCarouselItemIdx);

// If there are slides then set the active state on first slide
if (totalCarouselItems > 0) {
  dropdownItemBtns[currentCarouselItemIdx].classList.add(activeDropdownItemBtnClassName);
}

const updateDropdownActiveItem = (oldCarouselItemIdx, currentCarouselItemIdx) => {
  dropdownItemBtns[oldCarouselItemIdx].classList.remove(activeDropdownItemBtnClassName);
  dropdownItemBtns[currentCarouselItemIdx].classList.add(activeDropdownItemBtnClassName);

  return currentCarouselItemIdx;
};

const performSlideOnCurrentItem = (currentCarouselItemIdx, slidingDirection) => {
  let slideDirectionClassName;

  if (slidingDirection === transitionDirections.LEFT) {
    slideDirectionClassName = slideCarouselItemLeftClassName;
  } else if (slidingDirection === transitionDirections.RIGHT) {
    slideDirectionClassName = slideCarouselItemRightClassName;
  }
  // Slide current item given direction
  const currItem = carouselItems[currentCarouselItemIdx];
  currItem.classList.add(slideDirectionClassName);
  // TODO: Disable buttons on transition
  // After slide transition completes remove translateX(-100%) or translateX(100%) depending on slide direction
  setTimeout(() => {
    currItem.classList.remove(slideDirectionClassName);
  }, 600);

  return currentCarouselItemIdx;
};

const setNextImgIdx = (currentCarouselItemIdx) => {
  if (currentCarouselItemIdx === totalCarouselItems - 1) {
    currentCarouselItemIdx = 0;
  } else {
    currentCarouselItemIdx++;
  }
  return currentCarouselItemIdx;
};

const setPrevImgIdx = (currentCarouselItemIdx) => {
  if (currentCarouselItemIdx === 0) {
    currentCarouselItemIdx = totalCarouselItems - 1;
  } else {
    currentCarouselItemIdx--;
  }
  return currentCarouselItemIdx;
};

// Start onClick event handlers
const handleCarouselNextBtnClick = () => {
  const oldCarouselItemIdx = currentCarouselItemIdx;

  currentCarouselItemIdx = performSlideOnCurrentItem(
    currentCarouselItemIdx,
    transitionDirections.LEFT
  );
  currentCarouselItemIdx = setNextImgIdx(currentCarouselItemIdx);
  currentCarouselItemIdx = updateCarouselItemPositions(currentCarouselItemIdx);

  currentCarouselItemIdx = updateDropdownActiveItem(
    oldCarouselItemIdx,
    currentCarouselItemIdx
  );
};

const handleCarouselPrevBtnClick = () => {
  const oldCarouselItemIdx = currentCarouselItemIdx;

  currentCarouselItemIdx = performSlideOnCurrentItem(
    currentCarouselItemIdx,
    transitionDirections.RIGHT
  );
  currentCarouselItemIdx = setPrevImgIdx(currentCarouselItemIdx);
  currentCarouselItemIdx = updateCarouselItemPositions(currentCarouselItemIdx);

  currentCarouselItemIdx = updateDropdownActiveItem(
    oldCarouselItemIdx,
    currentCarouselItemIdx
  );
};

const handleDropdownItemClick = (dropdownItemIdx) => {
  const oldCarouselItemIdx = currentCarouselItemIdx;
  currentCarouselItemIdx = updateCarouselItemPositions(dropdownItemIdx);
  currentCarouselItemIdx = updateDropdownActiveItem(
    oldCarouselItemIdx,
    currentCarouselItemIdx
  );
};
// End onClick event handlers

// Start inject eventListeners
carouselNextBtn.addEventListener("click", () => {
  handleCarouselNextBtnClick();
});

carouselPrevBtn.addEventListener("click", () => {
  handleCarouselPrevBtnClick();
});

for (let i = 0; i < dropdownItemBtns.length; i++) {
  dropdownItemBtns[i].addEventListener("click", () => {
    handleDropdownItemClick(i);
  });
}
// End inject eventListeners
