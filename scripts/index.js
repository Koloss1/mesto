const popup = document.querySelector('.popup');
const popupProfile = document.querySelector(".popup_edit-info");
const popupCardsAdd = document.querySelector(".popup_add-cards");
const popupImage = document.querySelector('.popup_image');

const template = document.querySelector('.template').content;
const templateList = document.querySelector('.elements__list');

const imageName = template.querySelector(".elements__title");
const imageLink = template.querySelector(".elements__image");

const formProfile = popupProfile.querySelector(".form");
const formCardsAdd = popupCardsAdd.querySelector(".form");

const imageOpenPopup = document.querySelector('.popup__image-open');
const TextOpenPopup = document.querySelector('.popup__text-open');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt:  'Архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt:  'Челябинская область'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt:  'Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt:  'Камчатка'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt:  'Холмогорский район'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt:  'Байкал'
  }
];

// Попап редактирование имени и должности в профиле:

const profileInputName = document.querySelector('.form__input_type_name');
const profileInputJob = document.querySelector('.form__input_type_job');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const openButtonProfile = document.querySelector(".profile__edit-button");

const openPopup = function (popup) {
  popup.classList.add("popup_opened");
}

function openPopupProfile() {
  openPopup(popupProfile);
}

openButtonProfile.addEventListener('click', openPopupProfile);

profileInputName.value = profileName.textContent;
profileInputJob.value = profileJob.textContent;

const closeButtonProfile = popupProfile.querySelector(".popup__closed");

const closePopupProfile = function () {
  closePopup(popupProfile);
}

closeButtonProfile.addEventListener('click', closePopupProfile);

const handleFormSubmitProfile = function (evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileJob.textContent = profileInputJob.value;
  closePopupProfile();
}

formProfile.addEventListener('submit', handleFormSubmitProfile);


// Попап добавления новых изображений на страницу:

const openButtonCardsAdd = document.querySelector(".profile__add-button");

function openPopupCardsAdd() {
  openPopup(popupCardsAdd);
}

openButtonCardsAdd.addEventListener('click', openPopupCardsAdd);

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
}

const closeButtonCardsAdd = popupCardsAdd.querySelector(".popup__closed");

const closePopupCardsAdd = function () {
  closePopup(popupCardsAdd);
}

closeButtonCardsAdd.addEventListener('click', closePopupCardsAdd);

// Добавление новых изображений и их удаление

const newCard = function (item) {
  const cardList = template.querySelector('.elements__element').cloneNode(true);
  const newName = cardList.querySelector('.elements__title');
  const newLink = cardList.querySelector('.elements__image');

  cardList.querySelector('.elements__like').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('elements__like_active');
  });

  setEventListener(cardList);

  function deleteCard(evt) {
    const removeCard = evt.target.closest('.elements__element');
    removeCard.remove();
  }

  function setEventListener(cardList) {
    cardList.querySelector('.elements__trash').addEventListener('click', deleteCard);
  }

  newLink.addEventListener('click', function () {
    imageOpenPopup.src = item.link;
    imageOpenPopup.alt = item.name;
    TextOpenPopup.textContent = item.name;
    openPopup(popupImage);
  })

  newName.textContent = item.name;
  newLink.src = item.link;
  newLink.alt = item.name;
  return cardList;
}

const closeButtonImage = popupImage.querySelector('.popup__closed');

const closePopupImage = function () {
  closePopup(popupImage);
}

closeButtonImage.addEventListener('click', closePopupImage);

initialCards.forEach(function (item) {
  const card = newCard(item);
  templateList.append(card);
});

const imageInputName = popupCardsAdd.querySelector(".form__input_type_mesto");
const imageInputLink = popupCardsAdd.querySelector(".form__input_type_src");

const handleFormSubmitImages = function (evt) {
  evt.preventDefault();
  const cardImage = {name:imageInputName.value, link:imageInputLink.value}
  templateList.prepend(newCard (cardImage));
  closePopupCardsAdd();
  evt.target.reset();
}

formCardsAdd.addEventListener('submit', handleFormSubmitImages);
