const popupTemplate = document.querySelector('.popup');
const popupEditProfile = document.querySelector(".popup_edit-info");
const popupCardsAdd = document.querySelector(".popup_add-cards");
const popupImage = document.querySelector('.popup_image');

const cardsAddFormInputName = popupCardsAdd.querySelector(".form__input_type_mesto");
const cardsAddFormInputLink = popupCardsAdd.querySelector(".form__input_type_src");

const cardTemplate = document.querySelector('.template').content;
const templateList = document.querySelector('.elements__list');
const cardElementList = cardTemplate.querySelector('.elements__element');

const imageName = cardTemplate.querySelector(".elements__title");
const imageLink = cardTemplate.querySelector(".elements__image");

const formEditProfile = popupEditProfile.querySelector(".form");
const formCardsAdd = popupCardsAdd.querySelector(".form");

const imageOpenPopup = document.querySelector('.popup__image-open');
const TextOpenPopup = document.querySelector('.popup__text-open');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Челябинская область'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Камчатка'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Холмогорский район'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Байкал'
  }
];

// Попап редактирование имени и должности в профиле:

const profileInputName = document.querySelector('.form__input_type_name');
const profileInputJob = document.querySelector('.form__input_type_job');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const profileOpenButton = document.querySelector(".profile__edit-button");

const openPopupTemplate = function (popupTemplate) {
  popupTemplate.classList.add("popup_opened");
}

function openPopupEditProfile() {
  profileInputName.value = profileName.textContent;
  profileInputJob.value = profileJob.textContent;
  openPopupTemplate(popupEditProfile);
}

profileOpenButton.addEventListener('click', openPopupEditProfile);

const profileCloseButton = popupEditProfile.querySelector(".popup__closed");

const closePopupEditProfile = function () {
  closePopup(popupEditProfile);
}

profileCloseButton.addEventListener('click', closePopupEditProfile);

const handleFormSubmitProfile = function (evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileJob.textContent = profileInputJob.value;
  closePopupEditProfile();
}

formEditProfile.addEventListener('submit', handleFormSubmitProfile);


// Попап добавления новых изображений на страницу:

const openButtonCardsAdd = document.querySelector(".profile__add-button");

function openPopupCardsAdd() {
  cardsAddFormInputName.value = '';
  cardsAddFormInputLink.value = '';
  openPopupTemplate(popupCardsAdd);
}

openButtonCardsAdd.addEventListener('click', openPopupCardsAdd);

const closePopup = function (popupTemplate) {
  popupTemplate.classList.remove("popup_opened");
}

const closeButtonCardsAdd = popupCardsAdd.querySelector(".popup__closed");

const closePopupCardsAdd = function () {
  closePopup(popupCardsAdd);
}

closeButtonCardsAdd.addEventListener('click', closePopupCardsAdd);

// Добавление новых изображений и их удаление

const addCard = function (item) {
  const cardList = cardElementList.cloneNode(true);
  const cardName = cardList.querySelector('.elements__title');
  const cardLink = cardList.querySelector('.elements__image');

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

  cardLink.addEventListener('click', function () {
    imageOpenPopup.src = item.link;
    imageOpenPopup.alt = item.name;
    TextOpenPopup.textContent = item.name;
    openPopupTemplate(popupImage);
  })

  cardName.textContent = item.name;
  cardLink.src = item.link;
  cardLink.alt = item.name;
  return cardList;
}

const closeButtonImage = popupImage.querySelector('.popup__closed');

const closePopupImage = function () {
  closePopup(popupImage);
}

closeButtonImage.addEventListener('click', closePopupImage);

initialCards.forEach(function (item) {
  const card = addCard(item);
  templateList.append(card);
});

const handleFormSubmitImages = function (evt) {
  evt.preventDefault();
  const cardImage = { name: cardsAddFormInputName.value, link: cardsAddFormInputLink.value }
  templateList.prepend(addCard(cardImage));
  closePopupCardsAdd();
  evt.target.reset();
}

formCardsAdd.addEventListener('submit', handleFormSubmitImages);
