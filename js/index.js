const carouselImages = [
  {
    url: "public/images/blueJay.jpg",
    alt: "January",
    text: "January",
  },
  {
    url: "public/images/canary.jpg",
    alt: "February",
    text: "February",
  },
  {
    url: "public/images/hawk.jpg",
    alt: "March",
    text: "March",
  },
  {
    url: "public/images/hummingBird2.jpg",
    alt: "April",
    text: "April",
  },
  {
    url: "public/images/conure.jpg",
    alt: "May",
    text: "May",
  },
  {
    url: "public/images/cardinal.jpg",
    alt: "June",
    text: "June",
  },
  {
    url: "public/images/kingFisher.jpg",
    alt: "July",
    text: "July",
  },
  {
    url: "public/images/sparrow2.jpg",
    alt: "August",
    text: "August",
  },
  {
    url: "public/images/redParakeet.jpg",
    alt: "September",
    text: "September",
  },
  {
    url: "public/images/toucan.jpg",
    alt: "October",
    text: "October",
  },
  {
    url: "public/images/blueJay.jpg",
    alt: "November",
    text: "November",
  },
  {
    url: "public/images/hummingBird1.jpg",
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
const carouselItems = document.getElementsByClassName("carousel__item");
const carouselNextBtn = document.getElementById("carouselNextBtn");
const carouselPrevBtn = document.getElementById("carouselPreviousBtn");

// Carousel ClassNames
const activeCarouselItemClassName = "carousel__item--active";
const positionNextCarouselItemClassName = "carousel__item--setnext";
const positionPrevCarouselItemClassName = "carousel__item--setprev";

// Dropdown ClassNames
const activeDropdownItemBtnClassName = "nav__dropdown-item-btn--active";

// Dropdown DOM element
const dropdownItemBtns = document.getElementsByClassName("nav__dropdown-item-btn");

const totalCarouselItems = carouselItems.length;

// TODO: Maybe refactor updateCarouselItemPositions to return carousel items state instead of global being a global variable

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
  }, 600);
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

const initializeCarousel = () => {
  if (totalCarouselItems > 0) {
    updateDropdownActiveItem(0, 0);
  }

  if (totalCarouselItems === 1) {
    carouselItems[currentCarouselItemIdx].classList.add(activeCarouselItemClassName);
    return;
  }
  // Set initial state of the carousel items
  updateCarouselWindow(0, 0);
};

initializeCarousel();
// End inject eventListeners

// class Carousel {
//   constructor(carouselItems, carouselNextBtn, carouselPrevBtn, dropdownItemBtns) {
//     this.currentCarouselItemIdx = 0;

//     this.prevItem = null;
//     this.currItem = null;
//     this.nextItem = null;

//     // Carousel ClassNames
//     this.carouselItems = carouselItems;
//     this.carouselNextBtn = carouselNextBtn;
//     this.carouselPrevBtn = carouselPrevBtn;

//     // Dropdown ClassNames
//     this.activeCarouselItemClassName = "carousel__item--active";
//     this.slideCarouselItemLeftClassName = "carousel__item--next";
//     this.slideCarouselItemRightClassName = "carousel__item--prev";
//     this.carouselPositionNextItemClassName = "carousel__item--setnext";
//     this.carouselPositionPrevItemClassName = "carousel__item--setprev";

//     this.activeDropdownItemBtnClassName = "nav__dropdown-item-btn--active";

//     // Dropdown DOM element
//     this.dropdownItemBtns = dropdownItemBtns;

//     this.totalCarouselItems = carouselItems.length;

//     // this.options = options;

//     this.setCurrentCarouselItemIdx(
//       this.updateCarouselItemPositions(this.getCurrentCarouselItemIdx())
//     );

//     if (this.getTotalCarouselItems() > 0) {
//       this.dropdownItemBtns[this.getCurrentCarouselItemIdx()].classList.add(
//         this.getActiveDropdownItemBtnClassName()
//       );
//     }

//     this.setEventListeners();
//   }

//   getCarouselItems() {
//     return this.carouselItems;
//   }

//   getActiveCarouselItemClassName() {
//     return this.activeCarouselItemClassName;
//   }

//   getSlideCarouselItemLeftClassName() {
//     return this.slideCarouselItemLeftClassName;
//   }

//   getSlideCarouselItemRightClassName() {
//     return this.slideCarouselItemRightClassName;
//   }

//   getCarouselPositionNextItemClassName() {
//     return this.carouselPositionNextItemClassName;
//   }

//   getCarouselPositionPrevItemClassName() {
//     return this.carouselPositionPrevItemClassName;
//   }

//   getCurrentCarouselItemIdx() {
//     return this.currentCarouselItemIdx;
//   }

//   setCurrentCarouselItemIdx(newIdx) {
//     this.currentCarouselItemIdx = newIdx;
//   }

//   getTotalCarouselItems() {
//     return this.totalCarouselItems;
//   }

//   getPrevItem() {
//     return this.prevItem;
//   }

//   setPrevItem(newItem) {
//     this.prevItem = newItem;
//   }

//   getCurrItem() {
//     return this.currItem;
//   }

//   setCurrItem(newItem) {
//     this.currItem = newItem;
//   }

//   getNextItem() {
//     return this.nextItem;
//   }

//   setNextItem(newItem) {
//     this.nextItem = newItem;
//   }

//   getDropdownItemBtns() {
//     return this.dropdownItemBtns;
//   }

//   getActiveDropdownItemBtnClassName() {
//     return this.activeDropdownItemBtnClassName;
//   }

//   getCarouselNextBtn() {
//     return this.carouselNextBtn;
//   }

//   getCarouselPrevBtn() {
//     return this.carouselPrevBtn;
//   }

//   getDropdownItemBtns() {
//     return this.dropdownItemBtns;
//   }

//   updateCarouselItemPositions(currCarouselItemIdx) {
//     // Remove previous positioning styles
//     if (
//       this.getPrevItem()?.classList.contains(this.getCarouselPositionPrevItemClassName()) &&
//       this.getCurrItem()?.classList.contains(this.getActiveCarouselItemClassName()) &&
//       this.getNextItem()?.classList.contains(this.getCarouselPositionNextItemClassName())
//     ) {
//       this.getPrevItem().classList.remove(this.getCarouselPositionPrevItemClassName());
//       this.getCurrItem().classList.remove(this.getActiveCarouselItemClassName());
//       this.getNextItem().classList.remove(this.getCarouselPositionNextItemClassName());
//     }

//     const firstCarouselItem = this.getCurrentCarouselItemIdx() === 0;
//     const lastCarouselItem =
//       this.getCurrentCarouselItemIdx() === this.getTotalCarouselItems() - 1;

//     if (firstCarouselItem) {
//       this.setPrevItem(this.getCarouselItems()[this.getTotalCarouselItems() - 1]);
//       this.setCurrItem(this.getCarouselItems()[currCarouselItemIdx]);
//       this.setNextItem(this.getCarouselItems()[currCarouselItemIdx].nextElementSibling);
//     } else if (lastCarouselItem) {
//       this.setPrevItem(this.getCarouselItems()[currCarouselItemIdx].previousElementSibling);
//       this.setCurrItem(this.getCarouselItems()[currCarouselItemIdx]);
//       this.setNextItem(this.getCarouselItems()[0]);
//     } else {
//       this.setPrevItem(this.getCarouselItems()[currCarouselItemIdx].previousElementSibling);
//       this.setCurrItem(this.getCarouselItems()[currCarouselItemIdx]);
//       this.setNextItem(this.getCarouselItems()[currCarouselItemIdx].nextElementSibling);
//     }

//     this.getPrevItem().classList.add(this.getCarouselPositionPrevItemClassName());
//     this.getCurrItem().classList.add(this.getActiveCarouselItemClassName());
//     this.getNextItem().classList.add(this.getCarouselPositionNextItemClassName());

//     this.disableNextAndPrevBtns(true);
//     this.disableDropdownItemBtns(true);

//     setTimeout(() => {
//       this.disableNextAndPrevBtns(false);
//       this.disableDropdownItemBtns(false);
//     }, 750);

//     return currCarouselItemIdx;
//   }

//   updateDropdownActiveItem(oldCarouselItemIdx, currentCarouselItemIdx) {
//     this.getDropdownItemBtns()[oldCarouselItemIdx].classList.remove(
//       this.getActiveDropdownItemBtnClassName()
//     );

//     this.getDropdownItemBtns()[currentCarouselItemIdx].classList.add(
//       this.getActiveDropdownItemBtnClassName()
//     );

//     return currentCarouselItemIdx;
//   }

//   setNextImgIdx(currentCarouselItemIdx) {
//     if (currentCarouselItemIdx === this.getTotalCarouselItems() - 1) {
//       currentCarouselItemIdx = 0;
//     } else {
//       currentCarouselItemIdx++;
//     }
//     return currentCarouselItemIdx;
//   }

//   setPrevImgIdx(currentCarouselItemIdx) {
//     if (currentCarouselItemIdx === 0) {
//       currentCarouselItemIdx = this.getTotalCarouselItems() - 1;
//     } else {
//       currentCarouselItemIdx--;
//     }
//     return currentCarouselItemIdx;
//   }

//   handleCarouselNextBtnClick() {
//     const oldCarouselItemIdx = this.getCurrentCarouselItemIdx();

//     this.setCurrentCarouselItemIdx(
//       this.updateCarouselItemPositions(this.getCurrentCarouselItemIdx())
//     );
//     this.setCurrentCarouselItemIdx(this.setNextImgIdx(this.getCurrentCarouselItemIdx()));
//     this.setCurrentCarouselItemIdx(
//       this.updateCarouselItemPositions(this.getCurrentCarouselItemIdx())
//     );

//     this.setCurrentCarouselItemIdx(
//       this.updateDropdownActiveItem(oldCarouselItemIdx, this.getCurrentCarouselItemIdx())
//     );
//   }

//   handleCarouselPrevBtnClick() {
//     const oldCarouselItemIdx = this.currentCarouselItemIdx;

//     this.setCurrentCarouselItemIdx(
//       this.updateCarouselItemPositions(this.getCurrentCarouselItemIdx())
//     );
//     this.setCurrentCarouselItemIdx(this.setPrevImgIdx(this.getCurrentCarouselItemIdx()));
//     this.setCurrentCarouselItemIdx(
//       this.updateCarouselItemPositions(this.getCurrentCarouselItemIdx())
//     );

//     this.setCurrentCarouselItemIdx(
//       this.updateDropdownActiveItem(oldCarouselItemIdx, this.getCurrentCarouselItemIdx())
//     );
//   }

//   handleDropdownItemClick(dropdownItemIdx) {
//     const oldCarouselItemIdx = this.getCurrentCarouselItemIdx();
//     this.setCurrentCarouselItemIdx(dropdownItemIdx);

//     if (this.getCurrentCarouselItemIdx() === oldCarouselItemIdx) return;

//     this.setCurrentCarouselItemIdx(this.updateCarouselItemPositions(dropdownItemIdx));

//     this.setCurrentCarouselItemIdx(
//       this.updateDropdownActiveItem(oldCarouselItemIdx, this.getCurrentCarouselItemIdx())
//     );
//   }

//   setEventListeners() {
//     this.getCarouselNextBtn().addEventListener("click", () => {
//       this.handleCarouselNextBtnClick();
//     });

//     this.getCarouselPrevBtn().addEventListener("click", () => {
//       this.handleCarouselPrevBtnClick();
//     });

//     for (let i = 0; i < this.dropdownItemBtns.length; i++) {
//       this.getDropdownItemBtns()[i].addEventListener("click", () => {
//         this.handleDropdownItemClick(i);
//       });
//     }
//   }

//   disableNextAndPrevBtns(isDisabled = false) {
//     this.carouselNextBtn.disabled = isDisabled;
//     this.carouselNextBtn.ariaDisabled = isDisabled;
//     this.carouselPrevBtn.disabled = isDisabled;
//     this.carouselPrevBtn.ariaDisabled = isDisabled;
//   }

//   disableDropdownItemBtns(isDisabled = false) {
//     for (const btn of this.dropdownItemBtns) {
//       btn.disabled = isDisabled;
//     }
//   }
// }

// const carousel = new Carousel(
//   document.getElementsByClassName("carousel__item"),
//   document.getElementById("carouselNextBtn"),
//   document.getElementById("carouselPreviousBtn"),
//   document.getElementsByClassName("nav__dropdown-item-btn")
// );
