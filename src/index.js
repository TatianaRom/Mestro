import Api from './js/Api.js';
import CardList from './js/CardList.js';
import Card from './js/Card.js';
import Popup from './js/Popup.js';
import Validation from './js/Validation.js';
import "./style.css";
import './images/favicon.ico';

const isDev = process.env.NODE_ENV === 'development';


const config = {
  url: (isDev ? "http://95.216.175.5" : "https://praktikum.tk"),
  token: "23dbefcc-391a-4fe2-82b6-412e7086d806",
  content_type: "application/json",
  lang: "ru"
};

const words = {
  ru: {
    requiredLength: "Должно быть от 2 до 30 символов",
    requiredField: "Это обязательное поле",
    requiredLink: "Здесь должна быть ссылка"
  }
};

const api = new Api(config);
const cardList = new CardList(Card, api);
const validation = new Validation(words.ru);

function setUser(user) {
  document.getElementById("user-photo").src = user.avatar;
  document.getElementById("user-name").textContent = user.name;
  document.getElementById("user-job").textContent = user.about;
}

async function saveProfile() {
  const name = popupEditName.value;
  const about = popupEditAbout.value;
  await api.saveProfile(name, about);
}

//Объвление переменных
const root = document.querySelector(".root");
const placesList = root.querySelector(".places-list");
const userJob = root.querySelector(".user-info__job");
const userInfoButton = root.querySelector(".user-info__button");
const userInfoEditButton = root.querySelector(".user-info__edit-button");
const userName = root.querySelector(".user-info__name");
const form = document.forms.new;

//popup
const popup = document.querySelector(".popup");
const popupForm = popup.querySelector(".popup__form");
const popupClose = document.querySelector(".popup__close");
const popupName = document.querySelector(".popup__input_type_name");
const popupLink = document.querySelector(".popup__input_type_link-url");
const popupButton = document.querySelector(".popup__button");

//popup-edit
const popupEdit = document.querySelector(".popup-edit");
const popupEditForm = popupEdit.querySelector(".popup-edit__form");
const popupEditName = popupEdit.querySelector(".popup-edit__input_type_name");
const popupEditAbout = popupEdit.querySelector(".popup-edit__input_type_about");
const popupCloseEdit = document.querySelector(".popup-edit__close");
const editButton = document.getElementById("save-profile");

const popupImg = document.querySelector(".popup-img");
//const popupImageClose = document.querySelector(".popup-img__close");

//const popupImage = new Popup(popupImg, "popup-img_is-opened", popupImageClose);

const popupCard = new Popup(popup, "popup_is-opened", popupClose);
const popupProfile = new Popup(
  popupEdit,
  "popup-edit_is-opened",
  popupCloseEdit
);

userInfoButton.addEventListener("click", () => {
  popupCard.open();
});

userInfoEditButton.addEventListener("click", () => {
  popupProfile.open();
  popupEditName.value = userName.textContent;
  popupEditAbout.value = userJob.textContent;
});

popupForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const newCard = await api.addNewCard(popupName.value, popupLink.value);
  cardList.render(placesList, [newCard]);
  const notify = document.querySelector('.notify');

  notify.style.display = 'block';
  notify.textContent = "Новое место успешно добавлено!";

  setTimeout(() => {
    notify.textContent = '';
    notify.style.display = 'none';
  }, 3000);

  popupButton.disabled = true;
  popupForm.reset();
  popup.classList.remove("popup_is-opened");
});

editButton.addEventListener("click", saveProfile);

popupEditForm.addEventListener("submit", function (event) {
  event.preventDefault();
  userName.textContent = popupEditName.value;
  userJob.textContent = popupEditAbout.value;
  popupEdit.classList.remove("popup-edit_is-opened");
});

popupImg.addEventListener("click", function (event) {
  if (event.target.classList.contains("popup-img__close")) {
    popupImg.classList.remove("popup-img_is-opened");
  }
});

popupEditName.addEventListener("input", validation.validateProfile);
popupEditAbout.addEventListener("input", validation.validateProfile);
popupName.addEventListener("input", validation.validateImg);
popupLink.addEventListener("input", validation.validateImg);

async function main() {
  const user = await api.getUser();
  api.user = user;
  setUser(user);

  const cards = await api.getCards();
  cardList.render(placesList, cards);
}

main();

/*                     Добрый день!
 Прошу Вас обозначить группами замечаний "Нужно исправить" и "Можно лучше", т.к. несовсем понятно где критические ошибки,
а где рекомендации.

В ревью присутствуют замечания, касающиеся заданий прошлых спринтов, проекты которых,  в свое время, были приняты.

Исходя из сути замечаний, нужно переделать весь проект, что физически, к сожалению, сделать невозможно.

Прошу отметить, что про вынос в отдельные файлы всех классов и подключение их к index.html в заданиях к проектам, не указывалось.

Что касается замечания по классу Api,которое не должно  взаимодействовать с DOM, то в тренажере Яндекс Практикума приводились
задания с таким применением. Исходя из чего, данный способ был применен в настоящем проекте.

Проектное задание по API полностью функционирует, в соответствии с изложенными требованиями в  части обязательных заданий.
Кроме того, были реализованы и 4-7 задания из дополнительной части.

На основании вышеизложенного, прошу Вас пересмотреть замечания.


*/

/**
 * Здравствуйте
 *
 *
 * Необходимо вынести в отдельные файлы все классы и подключить их в index.html
 * файл Card.js = класс Card(){}
 * и так далее
 * Файл script.js будет использоваться у вас для взаимодействия между классами
 *
 *
 *
 * * это только пример, не более
 *
 *  файл Api.js = класс Api
 *
 * const api = new Api(config);
 *
* класс с карточкой. можно передать шаблон в качестве параметра
const card = new Card(api);

* список выражений с ошибками
const words = { ru: {} };

* выражения с ошибками передаёте в класс Валидации, который подставляет их куда надо
* в классе Валидации 1 метод = 1 Валидация, допустим на длинну символов.
* можно сделать допустим метод который будет аккамулировать несколько методов
const validation = new Validation(words);

* класс CardList просто принимает в качестве параметров ранее инициализированный класс card
const cardList = new CardList(card, api);

* Вызов добавления карточки
* container куда записывать карточку
cardList.render(container, cards);

* Далее у нас идёт класс Popup базовый
* мы его расширяем на класс всплывающего окна для карточек
//class PopupCard extends Popup {}
* а при инициализации передаёте валидацию, которую используете при проверке
const popupCard = new PopupCard(validation, api);

* тоже самое для профиля
//class PopupProfile extends Popup {}
const popupProfile = new PopupProfile(validation, api);

* и то же самое на увеличения картинки, но здесь ненадо валидации. Валидировать там нечего
//class popupImage extends Popup {}
const popupImage = new PopupImage();
* по итогу, каждый класс имеет свою узкую обязанность.
 *
 * По классу Api не должно быть взаимодействия с DOM
 * вы должны вызывать методы класса API из разных классов, а класс Api
 * должен возвращать ответ который вы можите использовать для реализации DOM
 *
 * Для валидации используйте кастомный метод
 * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Constraint_API%27s_element.setCustomValidity()
 *
 *
 *
 */

/**
 * Здравствуйте
 * Всё что я описал вышу всё относится к надо исправить, кроме валидации кастомным методом.
 * Я извиняюсь за прошлого ревьювера что не заметили ошибки и не указали их, но давайте
 * их поправим в текущем спринте для того чтобы следующие спринты были проще.
 *
 * Так же надо исправить:
 * нельзя       this.cardElement.getElementsByClassName(
        "place-card__likes"
      )[0].innerHTML = this.likes;
      Нельзя обращаться по индексу к элементам. Вёрстка может поменятся и возникнет ошибка
 *
 * можно лучше:
 * вынести из класса langNew и передавать в класс в качестве параметра
 *
 * ответ на вопрос:
 * - Проектное задание по API полностью функционирует, в соответствии с изложенными требованиями в  части обязательных заданий.
 * Вы делаете классы для того чтобы согласно обязанности класса был реализован определённый функционал. Сейчас вы пытаетесь этот
 * функционал реализовать в классе API, так делать нельзя.
 * https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF_%D0%B5%D0%B4%D0%B8%D0%BD%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D0%BE%D0%B9_%D0%BE%D1%82%D0%B2%D0%B5%D1%82%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D0%BE%D1%81%D1%82%D0%B8
 *
 *
 */
