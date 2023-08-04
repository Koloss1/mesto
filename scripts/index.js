const popupElements = document.querySelector('.popup');

const popupCloseButtonElement = document.querySelectorAll('.popup__closed');
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const profileAddButtonElement = document.querySelector('.profile__add-button');
const inputName = document.querySelector('.profile__title');
const inputJob = document.querySelector('.profile__subtitle');
const inputNameNew = popupElements.querySelector('.form__input_type_name');
const inputJobNew = popupElements.querySelector('.form__input_type_job');

const popupProfileElement = document.querySelector('.popup_edit-info');
const formProfileElement = popupProfileElement.querySelector('.form');

const popupAddElement = document.querySelector('.popup_add-cards');
const formAddElement = popupAddElement.querySelector('.form');
const inputTitle = formAddElement.querySelector('.form__input_type_mesto');
const inputLink = formAddElement.querySelector('.form__input_type_src');

const imagePopupElement = document.querySelector('.popup_image');
const popupImageElement = imagePopupElement.querySelector('.popup__image-open');
const imagePopupCaption = imagePopupElement.querySelector('.popup__text-open');

const elementsElement = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('template').content;

const submitProfileElement = popupProfileElement.querySelector('.form__submit');
const inputProfileForm = popupProfileElement.querySelectorAll('.form__input');

const submitAddElement = popupAddElement.querySelector('.form__submit');
const inputAddForm = popupAddElement.querySelectorAll('.form__input');


//открытие попапа
function openPopup (popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

profileEditButtonElement.addEventListener('click', () => {
  resetErrorForm(formProfileElement);
  inputNameNew.value = inputName.textContent;
  inputJobNew.value = inputJob.textContent;
  toggleButton(inputProfileForm, submitProfileElement, validationConfig.inactiveButtonClass)
  openPopup(popupProfileElement);
});

//закрытие попапа
function closePopup (popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}

popupCloseButtonElement.forEach((element) => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => {
    closePopup(popup);
  })
});

//закрытие с помощью esc
function closePopupEscape(evt){
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//закрытие по оверлею
function closePopupOverlay(evt){
  if (evt.target === evt.currentTarget){
    closePopup(evt.target);
  }
};

popupProfileElement.addEventListener('click', (evt) => {
  closePopupOverlay(evt);
})

popupAddElement.addEventListener('click', (evt) => {
  closePopupOverlay(evt);
})

imagePopupElement.addEventListener('click', (evt) => {
  closePopupOverlay(evt);
})

//Добавление новых данных и сохранение
formProfileElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  inputName.textContent = inputNameNew.value;
  inputJob.textContent = inputJobNew.value;
  closePopup(popupProfileElement);
});

//открытые попапа добавления новых карточек
profileAddButtonElement.addEventListener('click', () => {
  formAddElement.reset();
  resetErrorForm(formAddElement);
  toggleButton(inputAddForm, submitAddElement, validationConfig.inactiveButtonClass)
  openPopup(popupAddElement);
})

//карточки
function newCard(cardData){
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const imageElement = cardElement.querySelector('.elements__image');
  const deleteElement = cardElement.querySelector('.elements__trash');
  const likeElement = cardElement.querySelector('.elements__like');
  imageElement.alt = cardData.name;
  imageElement.src = cardData.link;
  cardElement.querySelector('.elements__title').textContent = cardData.name;
  likeElement.addEventListener('click', (evt) => evt.target.classList.toggle('elements__like_active'));
  deleteElement.addEventListener('click', (evt) => evt.target.closest('.elements__element').remove());

  imageElement.addEventListener('click', () => {
    popupImageElement.src = cardData.link;
    popupImageElement.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;
    openPopup(imagePopupElement);
  })
  return cardElement;
}

initialCards.forEach((element) => {
  const card = newCard(element);
  elementsElement.append(card);
})

formAddElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const objectNewCardInfo = {name: inputTitle.value, link: inputLink.value};
  elementsElement.prepend(newCard(objectNewCardInfo));
  closePopup(popupAddElement);
  evt.target.reset();
})

enableValidation(validationConfig);
