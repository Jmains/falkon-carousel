// TODO: Programmatically populate carousel items based on given number of imgs

// TODO: Programmatically populate dropdown nav items based on given number of imgs

// TODO: Programmatically populate drop down list indicators

// TODO: Add month text (jan, feb, march, etc...) under each carousel item

/*
 *********** Start Dropdown Functionality ***********
 */
const navContainer = document.getElementById("navContainer");
const dropdownToggleBtn = document.getElementById("dropdownToggleBtn");
const dropdown = document.getElementById("dropdown");

// Added and removed z index because visibilty hidden still applied z-index to
// dropdown disabling carousel next button click
const handleDropdownClick = () => {
  if (dropdown.classList.contains("nav__dropdown--show")) {
    navContainer.style.zIndex = 0;
    dropdown.classList.remove("nav__dropdown--show");
    dropdown.ariaExpanded = false;
  } else {
    navContainer.style.zIndex = 50;
    dropdown.classList.add("nav__dropdown--show");
    dropdown.ariaExpanded = true;
  }
};

dropdownToggleBtn.addEventListener("click", () => {
  handleDropdownClick();
});
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

// Dropdown DOM elements
const dropdownItemBtns = document.getElementsByClassName("nav__dropdown-item-btn");

const totalCarouselItems = carouselItems.length;

// If there are slides then set the active state on first slide
if (totalCarouselItems > 0) {
  carouselItems[currentCarouselItemIdx].classList.add("carousel__item--active");
  dropdownItemBtns[currentCarouselItemIdx].classList.add("nav__dropdown-item-btn--active");
}

const updateCarouselImage = (currentCarouselItemIdx, newCurrentCarouselItemIdx) => {
  // remove appropriate class lists
  carouselItems[currentCarouselItemIdx].classList.remove("carousel__item--active");
  dropdownItemBtns[currentCarouselItemIdx].classList.remove("nav__dropdown-item-btn--active");

  // add appropriate class list
  carouselItems[newCurrentCarouselItemIdx].classList.add("carousel__item--active");
  dropdownItemBtns[newCurrentCarouselItemIdx].classList.add("nav__dropdown-item-btn--active");
};

// Start onClick event handlers
const handleCarouselNextBtnClick = () => {
  if (currentCarouselItemIdx === totalCarouselItems - 1) {
    carouselItems[currentCarouselItemIdx].classList.remove("carousel__item--active");
    dropdownItemBtns[currentCarouselItemIdx].classList.remove(
      "nav__dropdown-item-btn--active"
    );
    currentCarouselItemIdx = 0;
    carouselItems[currentCarouselItemIdx].classList.add("carousel__item--active");
    dropdownItemBtns[currentCarouselItemIdx].classList.add("nav__dropdown-item-btn--active");
  } else {
    carouselItems[currentCarouselItemIdx].classList.remove("carousel__item--active");
    dropdownItemBtns[currentCarouselItemIdx].classList.remove(
      "nav__dropdown-item-btn--active"
    );
    currentCarouselItemIdx++;
    carouselItems[currentCarouselItemIdx].classList.add("carousel__item--active");
    dropdownItemBtns[currentCarouselItemIdx].classList.add("nav__dropdown-item-btn--active");
  }
};

const handleCarouselPrevBtnClick = () => {
  if (currentCarouselItemIdx === 0) {
    carouselItems[currentCarouselItemIdx].classList.remove("carousel__item--active");
    dropdownItemBtns[currentCarouselItemIdx].classList.remove(
      "nav__dropdown-item-btn--active"
    );
    currentCarouselItemIdx = totalCarouselItems - 1;
    carouselItems[currentCarouselItemIdx].classList.add("carousel__item--active");
    dropdownItemBtns[currentCarouselItemIdx].classList.add("nav__dropdown-item-btn--active");
  } else {
    carouselItems[currentCarouselItemIdx].classList.remove("carousel__item--active");
    dropdownItemBtns[currentCarouselItemIdx].classList.remove(
      "nav__dropdown-item-btn--active"
    );
    currentCarouselItemIdx--;
    carouselItems[currentCarouselItemIdx].classList.add("carousel__item--active");
    dropdownItemBtns[currentCarouselItemIdx].classList.add("nav__dropdown-item-btn--active");
  }
};

const handleDropdownItemClick = (dropdownItemIdx) => {
  updateCarouselImage(currentCarouselItemIdx, dropdownItemIdx);
  // Update the currentCarouselItemIdx to the newCarouselItemIdx
  currentCarouselItemIdx = dropdownItemIdx;
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
