const carouselImages = [
  {
    url: "images/blueJay.jpg",
    alt: "January",
    text: "January",
    description: "Blue Jay",
  },
  {
    url: "images/canary.jpg",
    alt: "February",
    text: "February",
    description: "Canary",
  },
  {
    url: "images/hawk.jpg",
    alt: "March",
    text: "March",
    description: "Hawk",
  },
  {
    url: "images/hummingBird.jpg",
    alt: "April",
    text: "April",
    description: "Hummingbird",
  },
  {
    url: "images/conure.jpg",
    alt: "May",
    text: "May",
    description: "Conure",
  },
  {
    url: "images/cardinal.jpg",
    alt: "June",
    text: "June",
    description: "Cardinal",
  },
  {
    url: "images/kingFisher.jpg",
    alt: "July",
    text: "July",
    description: "King Fisher",
  },
  {
    url: "images/sparrow.jpg",
    alt: "August",
    text: "August",
    description: "Sparrow",
  },
  {
    url: "images/redParakeet.jpg",
    alt: "September",
    text: "September",
    description: "Red Parakeet",
  },
  {
    url: "images/toucan.jpg",
    alt: "October",
    text: "October",
    description: "Toucan",
  },
  {
    url: "images/robin.jpg",
    alt: "November",
    text: "November",
    description: "Robin",
  },
  {
    url: "images/falcon.jpg",
    alt: "December",
    text: "December",
    description: "Falcon",
  },
];

const createCarouselItems = (carouselImages) => {
  let carouselInnerContainer = document.getElementById("carouselInnerContainer");

  const carouselListItemClassName = "carousel__item";
  const carouselImgClassName = "carousel__img";
  const carouselImgTextClassName = "carousel__img-title";
  const carouselImgDescriptionClassName = "carousel__img-description";

  for (const img of carouselImages) {
    let carouselListItem = document.createElement("li");
    carouselListItem.classList.add(carouselListItemClassName);

    let carouselImg = document.createElement("img");
    carouselImg.src = img.url;
    carouselImg.alt = img.alt;
    carouselImg.classList.add(carouselImgClassName);

    let carouselImgText = document.createElement("p");
    carouselImgText.innerText = img.text;
    carouselImgText.classList.add(carouselImgTextClassName);

    let carouselImgDescription = document.createElement("p");
    carouselImgDescription.innerText = img.description;
    carouselImgDescription.classList.add(carouselImgDescriptionClassName);

    carouselListItem.appendChild(carouselImg);
    carouselListItem.appendChild(carouselImgText);
    carouselListItem.appendChild(carouselImgDescription);

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

let currentCarouselItemIdx = 0;

// Carousel DOM elements
const carousel = document.getElementById("carousel");
const carouselItems = carousel.getElementsByClassName("carousel__item");
const carouselNextBtn = carousel.querySelector("#carouselNextBtn");
const carouselPrevBtn = carousel.querySelector("#carouselPreviousBtn");

// Carousel ClassNames
const activeCarouselItemClassName = "carousel__item--active";
const positionNextCarouselItemClassName = "carousel__item--setnext";
const positionPrevCarouselItemClassName = "carousel__item--setprev";

// Dropdown ClassNames
const activeDropdownItemBtnClassName = "nav__dropdown-item-btn--active";

// Dropdown DOM element
const dropdownItemBtns = dropdown.getElementsByClassName("nav__dropdown-item-btn");

const totalCarouselItems = carouselItems.length;

const disableNextAndPrevBtns = (isDisabled = false) => {
  carouselNextBtn.disabled = isDisabled;
  carouselNextBtn.ariaDisabled = isDisabled;
  carouselPrevBtn.disabled = isDisabled;
  carouselPrevBtn.ariaDisabled = isDisabled;
};

const disableDropdownItemBtns = (isDisabled = false) => {
  for (const btn of dropdownItemBtns) {
    btn.disabled = isDisabled;
  }
};

const removeWindowPositioningStyles = (prevItem, currItem, nextItem) => {
  if (totalCarouselItems === 2) {
    if (prevItem == null) {
      nextItem.classList.remove(positionNextCarouselItemClassName);
    } else {
      prevItem.classList.remove(positionPrevCarouselItemClassName);
    }
    currItem.classList.remove(activeCarouselItemClassName);
  }

  if (
    prevItem?.classList.contains(positionPrevCarouselItemClassName) &&
    currItem?.classList.contains(activeCarouselItemClassName) &&
    nextItem?.classList.contains(positionNextCarouselItemClassName)
  ) {
    prevItem.classList.remove(positionPrevCarouselItemClassName);
    currItem.classList.remove(activeCarouselItemClassName);
    nextItem.classList.remove(positionNextCarouselItemClassName);
  }
};

const addWindowPositioningStyles = (prevItem, currItem, nextItem) => {
  if (totalCarouselItems == 2) {
    if (prevItem == null) {
      nextItem.classList.add(positionNextCarouselItemClassName);
    } else {
      prevItem.classList.add(positionPrevCarouselItemClassName);
    }
  } else {
    prevItem.classList.add(positionPrevCarouselItemClassName);
    nextItem.classList.add(positionNextCarouselItemClassName);
  }

  currItem.classList.add(activeCarouselItemClassName);
};

const setCarouselWindow = (carouselItemIdx) => {
  let prevItem, currItem, nextItem;

  if (totalCarouselItems !== 2) {
    const isFirstCarouselItem = carouselItemIdx === 0;
    const isLastCarouselItem = carouselItemIdx === totalCarouselItems - 1;

    if (isFirstCarouselItem) {
      prevItem = carouselItems[totalCarouselItems - 1];
      currItem = carouselItems[carouselItemIdx];
      nextItem = carouselItems[carouselItemIdx].nextElementSibling;
    } else if (isLastCarouselItem) {
      prevItem = carouselItems[carouselItemIdx].previousElementSibling;
      currItem = carouselItems[carouselItemIdx];
      nextItem = carouselItems[0];
    } else {
      prevItem = carouselItems[carouselItemIdx].previousElementSibling;
      currItem = carouselItems[carouselItemIdx];
      nextItem = carouselItems[carouselItemIdx].nextElementSibling;
    }
  } else {
    // If only two items exist in Carousel
    if (carouselItemIdx === 0) {
      prevItem = null;
      currItem = carouselItems[carouselItemIdx];
      nextItem = carouselItems[carouselItemIdx].nextElementSibling;
    } else {
      prevItem = carouselItems[carouselItemIdx].previousElementSibling;
      currItem = carouselItems[carouselItemIdx];
      nextItem = null;
    }
  }

  return { prevItem, currItem, nextItem };
};

const updateCarouselWindow = (oldCarouselItemIdx, newCarouselItemIdx) => {
  let currentWindow = setCarouselWindow(oldCarouselItemIdx);
  removeWindowPositioningStyles(
    currentWindow.prevItem,
    currentWindow.currItem,
    currentWindow.nextItem
  );

  currentWindow = setCarouselWindow(newCarouselItemIdx);
  addWindowPositioningStyles(
    currentWindow.prevItem,
    currentWindow.currItem,
    currentWindow.nextItem
  );

  disableNextAndPrevBtns(true);
  disableDropdownItemBtns(true);

  setTimeout(() => {
    disableNextAndPrevBtns(false);
    disableDropdownItemBtns(false);
  }, 750);
};

const updateDropdownActiveItem = (oldCarouselItemIdx, currentCarouselItemIdx) => {
  dropdownItemBtns[oldCarouselItemIdx].classList.remove(activeDropdownItemBtnClassName);
  dropdownItemBtns[currentCarouselItemIdx].classList.add(activeDropdownItemBtnClassName);
};

const incrementCarouselItemIdx = (currentCarouselItemIdx) => {
  if (currentCarouselItemIdx === totalCarouselItems - 1) {
    currentCarouselItemIdx = 0;
  } else {
    currentCarouselItemIdx++;
  }
  return currentCarouselItemIdx;
};

const decrementCarouselItemIdx = (currentCarouselItemIdx) => {
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
  currentCarouselItemIdx = incrementCarouselItemIdx(currentCarouselItemIdx);

  updateCarouselWindow(oldCarouselItemIdx, currentCarouselItemIdx);
  updateDropdownActiveItem(oldCarouselItemIdx, currentCarouselItemIdx);
};

const handleCarouselPrevBtnClick = () => {
  const oldCarouselItemIdx = currentCarouselItemIdx;
  currentCarouselItemIdx = decrementCarouselItemIdx(currentCarouselItemIdx);

  updateCarouselWindow(oldCarouselItemIdx, currentCarouselItemIdx);
  updateDropdownActiveItem(oldCarouselItemIdx, currentCarouselItemIdx);
};

const handleDropdownItemClick = (dropdownItemIdx) => {
  const oldCarouselItemIdx = currentCarouselItemIdx;
  currentCarouselItemIdx = dropdownItemIdx;

  if (oldCarouselItemIdx === currentCarouselItemIdx) return;

  updateCarouselWindow(oldCarouselItemIdx, currentCarouselItemIdx);
  updateDropdownActiveItem(oldCarouselItemIdx, currentCarouselItemIdx);
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

const initializeCarousel = () => {
  if (totalCarouselItems > 0) {
    updateDropdownActiveItem(0, 0);
  }

  if (totalCarouselItems === 1) {
    carouselItems[currentCarouselItemIdx].classList.add(activeCarouselItemClassName);
    return;
  }

  updateCarouselWindow(0, 0);
};

initializeCarousel();
