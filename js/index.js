// TODO: Programmatically populate carousel items based on given number of imgs
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
    url: "https://unsplash.it/800/800?image=96",
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
  for (const img of carouselImages) {
    // Create li tag
    let carouselListItem = document.createElement("li");
    carouselListItem.classList.add("carousel__item");
    // Create img tag
    let carouselImg = document.createElement("img");
    carouselImg.src = img.url;
    carouselImg.alt = img.alt;
    carouselImg.classList.add("carousel__img");
    // Create img text
    let carouselImgText = document.createElement("p");
    carouselImgText.innerHTML = img.text;
    carouselImgText.classList.add("carousel__img-text");

    carouselListItem.appendChild(carouselImg);
    carouselListItem.appendChild(carouselImgText);

    carouselInnerContainer.appendChild(carouselListItem);
  }
};

createCarouselItems(carouselImages);

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
