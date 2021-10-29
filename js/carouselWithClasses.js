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
