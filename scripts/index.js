let popup = document.querySelector('.popup');
let closedPopupButton = document.querySelector('.popup__closed');
let openPopupButton = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let form = document.querySelector('.form');
let pInputName = document.querySelector('.form__input_type_name');
let pInputJob = document.querySelector('.form__input_type_job');

let popupOpen = function () {
  popup.classList.add("popup_opened");
  pInputName.value = profileTitle.textContent;
  pInputJob.value = profileSubtitle.textContent;
}

let popupClose = function () {
popup.classList.remove("popup_opened");
}

openPopupButton.addEventListener('click', popupOpen);
closedPopupButton.addEventListener('click', popupClose);

let handleFormSubmit = function (evt) {
  evt.preventDefault();
  profileTitle.innerText = pInputName.value;
  profileSubtitle.innerText = pInputJob.value;
  popupClose ()
}

form.addEventListener('submit', handleFormSubmit);

