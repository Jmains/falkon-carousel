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

// Added and removed z index because visibilty hidden still applied z-index to
// dropdown disabling carousel next button click

const hideDropdown = () => {
  navContainer.style.zIndex = 0;
  dropdown.classList.remove("nav__dropdown--show");
  dropdown.ariaExpanded = false;
};

const showDropdown = () => {
  navContainer.style.zIndex = 50;
  dropdown.classList.add("nav__dropdown--show");
  dropdown.ariaExpanded = true;
};

const handleDropdownClick = () => {
  if (dropdown.classList.contains("nav__dropdown--show")) {
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
let prevItem, currentItem, nextItem;

// Carousel DOM elements
const carouselItems = document.getElementsByClassName("carousel__item");
const carouselNextBtn = document.getElementById("carouselNextBtn");
const carouselPrevBtn = document.getElementById("carouselPreviousBtn");

// const activeCarouselClassName = ""
// const slideCarouselItemLeftClassName = ""
// const slideCarouselItemRightClassName = ""

// const activeDropdownItemClassName = ""

// Dropdown DOM elements
const dropdownItemBtns = document.getElementsByClassName("nav__dropdown-item-btn");

const totalCarouselItems = carouselItems.length;

// TODO: Fix carousel bug: Reset css styles on carousel direction change or remove the specific "setnext" or "setprev" styles instead
// TODO: Maybe refactor updateCarouselItemPositions to return carousel items state instead of global being a global variable

const updateCarouselItemPositions = (currentCarouselItemIdx) => {
  // let prevItem, currentItem, nextItem;
  // If first item
  if (currentCarouselItemIdx === 0) {
    prevItem = carouselItems[totalCarouselItems - 1];
    currentItem = carouselItems[currentCarouselItemIdx];
    nextItem = carouselItems[currentCarouselItemIdx].nextElementSibling;
  } // If last item
  else if (currentCarouselItemIdx === totalCarouselItems - 1) {
    prevItem = carouselItems[currentCarouselItemIdx].previousElementSibling;
    currentItem = carouselItems[currentCarouselItemIdx];
    nextItem = carouselItems[0];
  } else {
    prevItem = carouselItems[currentCarouselItemIdx].previousElementSibling;
    currentItem = carouselItems[currentCarouselItemIdx];
    nextItem = carouselItems[currentCarouselItemIdx].nextElementSibling;
  }

  // return { prevItem, currentItem, nextItem };
};

updateCarouselItemPositions(currentCarouselItemIdx);

// If there are slides then set the active state on first slide
if (totalCarouselItems > 2) {
  prevItem.classList.add("carousel__item--setprev");
  currentItem.classList.add("carousel__item--active");
  nextItem.classList.add("carousel__item--setnext");
  dropdownItemBtns[currentCarouselItemIdx].classList.add("nav__dropdown-item-btn--active");
}

const updateCarouselImage = (currentCarouselItemIdx, targetCarouselItemIdx) => {
  // remove appropriate class lists
  carouselItems[currentCarouselItemIdx].classList.remove("carousel__item--active");
  dropdownItemBtns[currentCarouselItemIdx].classList.remove("nav__dropdown-item-btn--active");

  // add appropriate class list
  carouselItems[targetCarouselItemIdx].classList.add("carousel__item--active");
  dropdownItemBtns[targetCarouselItemIdx].classList.add("nav__dropdown-item-btn--active");

  return targetCarouselItemIdx;
};

const slideToNextImg = (currentCarouselItemIdx) => {
  if (currentCarouselItemIdx === totalCarouselItems - 1) {
    dropdownItemBtns[currentCarouselItemIdx].classList.remove(
      "nav__dropdown-item-btn--active"
    );

    // Slide current slide away and remove active state
    currentItem.classList.add("carousel__item--next");
    currentItem.classList.remove("carousel__item--active");

    // Slide next slide into view, set active state, and remove setnext class
    nextItem.classList.add("carousel__item--active");
    nextItem.classList.remove("carousel__item--setnext");

    let oldCurr = currentItem;
    // After slide transition completes remove translateX(-100%)
    setTimeout(() => {
      oldCurr.classList.remove("carousel__item--next");
    }, 600);

    currentCarouselItemIdx = 0;
    updateCarouselItemPositions(currentCarouselItemIdx);

    dropdownItemBtns[currentCarouselItemIdx].classList.add("nav__dropdown-item-btn--active");

    currentItem.classList.add("carousel__item--active");
    nextItem.classList.add("carousel__item--setnext");
  } else {
    // Remove active state from dropdown
    dropdownItemBtns[currentCarouselItemIdx].classList.remove(
      "nav__dropdown-item-btn--active"
    );

    // Slide current slide away and remove active state
    currentItem.classList.add("carousel__item--next");
    currentItem.classList.remove("carousel__item--active");

    // Slide next slide into view, set active state, and remove setnext class
    nextItem.classList.add("carousel__item--active");
    nextItem.classList.remove("carousel__item--setnext");

    let oldCurr = currentItem;
    // After slide transition completes remove translateX(-100%)
    setTimeout(() => {
      oldCurr.classList.remove("carousel__item--next");
    }, 600);

    currentCarouselItemIdx++;
    updateCarouselItemPositions(currentCarouselItemIdx);

    dropdownItemBtns[currentCarouselItemIdx].classList.add("nav__dropdown-item-btn--active");

    currentItem.classList.add("carousel__item--active");
    nextItem.classList.add("carousel__item--setnext");
  }

  return currentCarouselItemIdx;
};

const slideToPrevImg = (currentCarouselItemIdx) => {
  if (currentCarouselItemIdx === 0) {
    // Remove active state from dropdown
    dropdownItemBtns[currentCarouselItemIdx].classList.remove(
      "nav__dropdown-item-btn--active"
    );

    // Slide current carousel item to the right and remove active state
    currentItem.classList.add("carousel__item--prev");
    currentItem.classList.remove("carousel__item--active");

    // Slide next carousel item into view, set active state, and remove setnext class
    prevItem.classList.add("carousel__item--active");
    prevItem.classList.remove("carousel__item--setprev");

    let oldCurr = currentItem;
    // After slide transition completes remove translateX(100%)
    setTimeout(() => {
      oldCurr.classList.remove("carousel__item--prev");
    }, 600);

    currentCarouselItemIdx = totalCarouselItems - 1;
    updateCarouselItemPositions(currentCarouselItemIdx);

    dropdownItemBtns[currentCarouselItemIdx].classList.add("nav__dropdown-item-btn--active");

    currentItem.classList.add("carousel__item--active");
    prevItem.classList.add("carousel__item--setprev");
  } else {
    // Remove active state from dropdown
    dropdownItemBtns[currentCarouselItemIdx].classList.remove(
      "nav__dropdown-item-btn--active"
    );

    // Slide current slide away and remove active state
    currentItem.classList.add("carousel__item--prev");
    currentItem.classList.remove("carousel__item--active");

    // Slide next slide into view, set active state, and remove setnext class
    prevItem.classList.add("carousel__item--active");
    prevItem.classList.remove("carousel__item--setprev");

    let oldCurr = currentItem;
    // After slide transition completes remove translateX(100%)
    setTimeout(() => {
      oldCurr.classList.remove("carousel__item--prev");
    }, 600);
    currentCarouselItemIdx--;
    updateCarouselItemPositions(currentCarouselItemIdx);

    dropdownItemBtns[currentCarouselItemIdx].classList.add("nav__dropdown-item-btn--active");

    currentItem.classList.add("carousel__item--active");
    prevItem.classList.add("carousel__item--setprev");
  }

  return currentCarouselItemIdx;
};

// Start onClick event handlers
const handleCarouselNextBtnClick = () => {
  // Return index because index is only updated within the function scope since
  // we passed in the carouselItemIdx
  currentCarouselItemIdx = slideToNextImg(currentCarouselItemIdx);
};

const handleCarouselPrevBtnClick = () => {
  // Return index because index is only updated within the function scope since
  // we passed in the carouselItemIdx
  currentCarouselItemIdx = slideToPrevImg(currentCarouselItemIdx);
};

const handleDropdownItemClick = (dropdownItemIdx) => {
  // Return index because index is only updated within the function scope since
  // we passed in the carouselItemIdx
  currentCarouselItemIdx = updateCarouselImage(currentCarouselItemIdx, dropdownItemIdx);
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

/*
 *********** End Dropdown Functionality ***********
 */
