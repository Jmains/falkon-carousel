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
let prevItem, currentItem, nextItem;

const carouselItems = document.getElementsByClassName("carousel__item");
const carouselNextBtn = document.getElementById("carouselNextBtn");
const carouselPrevBtn = document.getElementById("carouselPreviousBtn");

const totalCarouselItems = carouselItems.length;

// Experimental
// const setItemPositions = (currentCarouselItemIdx) => {
//   if (currentCarouselItemIdx === 0) {
//     prevItem = carouselItems[totalCarouselItems - 1];
//     currentItem = carouselItems[currentCarouselItemIdx];
//     nextItem = carouselItems[currentCarouselItemIdx + 1];
//   } else if (currentCarouselItemIdx === totalCarouselItems - 1) {
//     prevItem = carouselItems[currentCarouselItemIdx - 1];
//     currentItem = carouselItems[currentCarouselItemIdx];
//     nextItem = carouselItems[0];
//   } else {
//     prevItem = carouselItems[currentCarouselItemIdx - 1];
//     currentItem = carouselItems[currentCarouselItemIdx];
//     nextItem = carouselItems[currentCarouselItemIdx + 1];
//   }

//   currentItem.style.left = "0";
//   prevItem.style.left = "100%";
//   nextItem.style.left = "-100%";
// };

// setItemPositions(currentCarouselItemIdx);

// If there are slides then set the active state on first slide
if (totalCarouselItems > 0) {
  carouselItems[currentCarouselItemIdx].classList.add("carousel__item--active");
}

const handleCarouselNextBtnClick = () => {
  if (currentCarouselItemIdx === totalCarouselItems - 1) {
    carouselItems[currentCarouselItemIdx].classList.remove("carousel__item--active");
    currentCarouselItemIdx = 0;
    carouselItems[currentCarouselItemIdx].classList.add("carousel__item--active");
  } else {
    carouselItems[currentCarouselItemIdx].classList.remove("carousel__item--active");
    currentCarouselItemIdx++;
    carouselItems[currentCarouselItemIdx].classList.add("carousel__item--active");
  }
};

const handleCarouselPrevBtnClick = () => {
  if (currentCarouselItemIdx === 0) {
    carouselItems[currentCarouselItemIdx].classList.remove("carousel__item--active");
    currentCarouselItemIdx = totalCarouselItems - 1;
    carouselItems[currentCarouselItemIdx].classList.add("carousel__item--active");
  } else {
    carouselItems[currentCarouselItemIdx].classList.remove("carousel__item--active");
    currentCarouselItemIdx--;
    carouselItems[currentCarouselItemIdx].classList.add("carousel__item--active");
  }
};

carouselNextBtn.addEventListener("click", () => {
  handleCarouselNextBtnClick();
});

carouselPrevBtn.addEventListener("click", () => {
  handleCarouselPrevBtnClick();
});
/*
 *********** End Dropdown Functionality ***********
 */
