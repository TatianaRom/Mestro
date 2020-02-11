function viewImage(event) {
  let url = event.target.getAttribute(`url`);

  if (event.target.classList.contains("place-card__image")) {
    const popupImg = document.querySelector(".popup-img");
    const popupImgBig = popupImg.querySelector(".popup-img__big");
    popupImg.classList.add("popup-img_is-opened");
    popupImgBig.setAttribute("src", url);
  }
}

//класс, создающий карточку
export default class Card {
  constructor(card, api) {
    //метод будет вызван при создании  новой карточки
    this.api = api;
    this.card = card;
    this.name = card.name;
    this.link = card.link;
    this.likes = card.likes.length;
    this.likes_array = card.likes;
    this._id = card._id;
    this.cardElement = this.create(card);
    this.remove = this.remove.bind(this);
    this.like = this.like.bind(this);

    this.cardElement
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like);

    if (card.owner._id === this.api.user._id) {
      this.cardElement
        .querySelector(".place-card__delete-icon")
        .addEventListener("click", this.remove);
    }
  }

  like(event) {
    event.target.classList.toggle("place-card__like-icon_liked");

    if (!this.likes_array.some(l => l._id === this.api.user._id)) {
      this.api.addLike(this._id);
      this.addLike();
    } else {
      this.api.disLike(this._id);
      this.disLike();
    }
  }
  // Правильнее наверное получить обновлённую информацию с сервера
  addLike() {
    this.likes++;
    this.likes_array.push(this.api.user);
    this.cardElement.querySelector(
      ".place-card__likes"
    ).textContent = this.likes;
  }
  disLike() {
    this.likes--;
    this.likes_array = this.likes_array.filter(l => l._id != this.api.user._id);
    this.cardElement.querySelector(
      ".place-card__likes"
    ).textContent = this.likes;
  }
  async remove() {
    const result = await this.api.deleteCard(this._id);
    if (result) {
      const placesList = document.querySelector(".places-list");
      placesList.removeChild(this.cardElement);
      const notify = document.querySelector('.notify');

      notify.style.display = 'block';
      notify.textContent = "Место успешно удалено!";
    
      setTimeout(() => {
        notify.textContent = '';
        notify.style.display = 'none';
      }, 3000);
    }
  }
  create(card) {
    //главный каркас функции
    //верх карточки: добавление картинки, корзины
    const bodyCard = document.createElement("div");
    bodyCard.classList.add("place-card");

    const imageCard = document.createElement("div");
    imageCard.classList.add("place-card__image");
    imageCard.style.backgroundImage = `url(${card.link})`;

    imageCard.setAttribute("url", `${card.link}`);
    imageCard.addEventListener("click", viewImage);

    if (card.owner._id === this.api.user._id) {
      const delButton = document.createElement("button");
      delButton.classList.add("place-card__delete-icon");
      imageCard.appendChild(delButton);
    }

    //Низ карточки с наименованием и лайком
    const desCard = document.createElement("div");
    desCard.classList.add("place-card__description");

    const nameCard = document.createElement("h3");
    nameCard.classList.add("place-card__name");
    nameCard.textContent = card.name; //будут добавляться названия карточек

    const likeCont = document.createElement("div");

    const likeButton = document.createElement("button");
    likeButton.classList.add("place-card__like-icon");

    if (card.likes.some(l => l._id === this.api.user._id)) {
      likeButton.classList.add("place-card__like-icon_liked");
    }

    const likes = document.createElement("div");
    likes.classList.add("place-card__likes");
    likes.id = "image-likes";
    likes.innerHTML = this.likes;

    //присоединяем дочерние элеметы (корзина, название, лайк) к родительским( изображение, описание)
    desCard.appendChild(nameCard);
    likeCont.appendChild(likeButton);
    likeCont.appendChild(likes);
    desCard.appendChild(likeCont);
    //присоединяем дочерние элементы (изображения и описание карточки) к каркасу карточки
    bodyCard.appendChild(imageCard);
    bodyCard.appendChild(desCard);
    //присоединяем каркас к контейнеру с карточками

    return bodyCard;
  }
}
