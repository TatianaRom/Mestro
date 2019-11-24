//Избавляемся от глобальных переменных 
(function () {
  //Объвление переменных
  const root = document.querySelector('.root'); //тело страницы
  const placesList = root.querySelector('.places-list'); //контейнер для карточек
  const popup = document.querySelector('.popup'); //окно для добавления новых карточек
  const popupForm = popup.querySelector('.popup__form'); //тело формы
  const form = document.forms.new; //получаем новую форму

  //popup-edit
  const popupEdit = document.querySelector('.popup-edit'); //окно для редактирования профиля
  const popupEditForm = popupEdit.querySelector('.popup-edit__form'); //тело формы
  const popupEditName = popupEdit.querySelector('.popup-edit__input_type_name'); //поле ввода имени
  const popupEditAbout = popupEdit.querySelector('.popup-edit__input_type_about'); //поле ввода информации о себе
  const userName = root.querySelector('.user-info__name');
  const userJob = root.querySelector('.user-info__job');

  //image-popup
  const popupImg = document.querySelector('.popup-img');
  const popupImgBig = popupImg.querySelector('.popup-img__big');

  //Объявление переменной и присвоение ей значение массива
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
      name: 'Нургуш',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
    },
    {
      name: 'Тулиновка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
    },
    {
      name: 'Остров Желтухина',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
    },
    {
      name: 'Владивосток',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
    }
  ];

  // Функция, собирающая карточку
  function cardConstructor(name, link) {

    //главный каркас функции
    //верх карточки: добавление картинки, корзины
    const bodyCard = document.createElement('div');
    bodyCard.classList.add('place-card');

    const imageCard = document.createElement('div');
    imageCard.classList.add('place-card__image');
    imageCard.style.backgroundImage = `url(${link})`;//добавление изображений 

    imageCard.setAttribute('url', `${link}`);//устанавливаем для атрибута имя и само значение
    imageCard.addEventListener('click', viewImage);//присоединяем обработчик события на imageCard при вызове функции для открытия картинки

    const delButton = document.createElement('button');
    delButton.classList.add('place-card__delete-icon');

    //функция удаления карточки
    delButton.addEventListener('click', function (event) {
      placesList.removeChild(event.target.closest('.place-card'));
    });
    //Низ карточки с наименованием и лайком 
    const desCard = document.createElement('div');
    desCard.classList.add('place-card__description');

    const nameCard = document.createElement('h3');
    nameCard.classList.add('place-card__name');
    nameCard.textContent = name; //будут добавляться названия карточек

    const likeButton = document.createElement('button');
    likeButton.classList.add('place-card__like-icon');

    //присоединяем дочерние элеметы (корзина, название, лайк) к родительским( изображение, описание)
    imageCard.appendChild(delButton);
    desCard.appendChild(nameCard);
    desCard.appendChild(likeButton);
    //присоединяем дочерние элементы (изображения и описание карточки) к каркасу карточки
    bodyCard.appendChild(imageCard);
    bodyCard.appendChild(desCard);
    //присоединяем каркас к контейнеру с карточками
    placesList.appendChild(bodyCard);
  }

  //функция работы лайков

  placesList.addEventListener('click', function (event) {
    if (event.target.classList.contains('place-card__like-icon')) {//проверяем, что клик произошел по данному элементу
      event.target.classList.toggle('place-card__like-icon_liked');//добавляем в event.target нужный класс
    }
  });


  //Функция с методом перебора массивов
  function getArrObj(initialCards) {
    initialCards.forEach(function (item) {
      cardConstructor(item.name, item.link);
    })
  }
  getArrObj(initialCards);


  //функция, открывающая и закрывающая форму для картинок  
  function openForm() {
    popup.classList.add('popup_is-opened');
  }

  function closeForm() {
    popup.classList.remove('popup_is-opened');
  }

  function showForm() {
    const formButton = document.querySelector('.user-info__button');
    formButton.addEventListener('click', openForm);

    const closeButton = document.querySelector('.popup__close');
    closeButton.addEventListener('click', closeForm);

  }
  showForm();


  //функция добавления карточки
  popupForm.addEventListener('submit', function (event) { //отправка формы на сервер
    event.preventDefault();
    const newName = form.elements.name.value;//Определяет значение элемента формы, которое будет отправлено на сервер. На сервер отправляется пара «имя=значение», где имя задается атрибутом name тега <input>, а значение — атрибутом value.
    const newLink = form.elements.link.value;
    cardConstructor(newName, newLink);

    saveImgBtn.disabled = true;

    popupForm.reset(); //сброс  полей ввода
    popup.classList.remove('popup_is-opened');//после добавления карточки, окно "Попап" закрывается автоматически

  });


  //функция, открывающая и закрывающая форму с редактированием профиля    
  function openEdForm() {
    popupEdit.classList.add('popup-edit_is-opened')
    popupEditName.value = userName.textContent;//Имя по умолчанию
    popupEditAbout.value = userJob.textContent;//Работа по умолчанию
  }

  function closeEdForm() {
    popupEdit.classList.remove('popup-edit_is-opened');
  }

  function showEdForm() {
    const formEdButton = document.querySelector('.user-info__edit-button');
    formEdButton.addEventListener('click', openEdForm);
    const closeEdButton = document.querySelector('.popup-edit__close');

    closeEdButton.addEventListener('click', closeEdForm);
  }
  showEdForm();


  //функция редактирования профиля
  popupEditForm.addEventListener('submit', function (event) {
    event.preventDefault();//не дает странице перезагружаться автоматически
    userName.textContent = popupEditName.value;//Изменение поля имени
    userJob.textContent = popupEditAbout.value;//Изменение поля работы
    popupEdit.classList.remove('popup-edit_is-opened');//после нажатия на кнопку, окно "Попап" закрывается автоматически
  });


  //функция, открывающая попап для больших картинок  
  function viewImage(event) {
    let url = event.target.getAttribute(`url`);//получаем атрибут, принима на вход его имя и возвращая его значение - вернется ссылка, записанная в url

    if (event.target.classList.contains('place-card__image')) {//проверяем на наличие класса у элемента
      popupImg.classList.add('popup-img_is-opened');//присваиваем класс элементу
      popupImgBig.setAttribute('src', url); //устанавливаем для атрибута имя и само значение
    }
  };

  // Закрытие попапа для больших картинок 
  popupImg.addEventListener('click', function (event) {//присоединяем обработчик события на попапе
    if (event.target.classList.contains('popup-img__close')) {//проверяем на наличие класса у элемента
      popupImg.classList.remove('popup-img_is-opened');//удаляем атрибут 
    }
  });


  //Валидация

  //Валидация "Редактировать профиль"
  //объявление переменной, в которой запрашиваем  селектор <input> с данным классом
  const inputName = document.querySelector('.popup-edit__input_type_name');
  inputName.addEventListener('input', validate);//вешаем обработчик событий в поле с "именем"
  //объявление переменных, в которых запрашиваем определенные селекторы с определеным  классом
  const errName = document.querySelector('.error__name');
  const inputAbout = document.querySelector('.popup-edit__input_type_about');
  inputAbout.addEventListener('input', validate);//вешаем обработчик событий в поле "о себе"
  //объявление перемнных, в которых запрашиваем определенные селекторы с классом
  const errAbout = document.querySelector('.error__about');
  const save = document.querySelector('.popup-edit__button');

  //функция валидации с параметром event
  function validate(event) {
    //объявлением переменных, в которых будут проверяться поля с введенными данными - длина символов
    const len = event.target.value.length;//содержит значение поля ввода, value — это свойство элемента, который нам вернется из event.target
    const lenN = inputName.value.length;//переменная, в которой будет проверка значением длины в поле "имя"
    const lenA = inputAbout.value.length;//переменная, в которой будет проверка значением длины в поле "о себе"
    const lang = { validationLenght: 'Должно быть от 2 до 30 символов', validationInput: 'Это обязательное поле' };//названия ощибок выносим в отдельный объект

    let message = "";//переменная с пустым сообщением, куда будут подставляться необходимые сообщения

    if (!len) { //условие, при котором срабатывает ошибка, если ничего не введено в оба поля
      message = lang.validationInput;
    }

    else if (len < 2 || len > 30) {//условие, при котором срабатывает сообщением, где введенная длина символов в оба поля  меньше 2 и больше 30
      message = lang.validationLenght;
    }
    if (lenN < 2 || lenN > 30 || lenA < 2 || lenA > 30) {//условие, если введенные значения полей невалидны, то
      save.disabled = true;// кнопка блокируется
    } else {
      save.disabled = false;//иначе, кнопка активируется
    }
    event.target.nextElementSibling.innerText = message;// устанавливаем текст сообщения, элементу следующим за элементом в который вводим текст
  }


  //Валидация для формы "Новое место"
  const inputNameImg = document.querySelector('.popup__input_type_name');
  inputNameImg.addEventListener('input', validateImg);

  const inputLink = document.querySelector('.popup__input_type_link-url');
  inputLink.addEventListener('input', validateImg);

  const saveImgBtn = document.querySelector('.popup__button');//const saveImgBtn = document.querySelector('#save-image');
  //объявляем переменную, в которой будет проверка соответствия введенных данных,  паттерну
  let urlPattern = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/;

  //функция валидации 
  function validateImg({ target }) {//автоматом извлекается из передаваемого в функцию elem - аттрибут target
    let errorMessage = '';//переменная с пустым значением
    const targetLength = target.value.length;
    const targetName = target.name;
    const targetValue = target.value;
    const langNew = { validationLen: 'Должно быть от 2 до 30 символов', validationIn: 'Это обязательное поле', validationLink: 'Здесь должна быть ссылка' };//названия ощибок выносим в отдельный объект

    if (!targetLength) { //условие, при котором проверяются оба поля на наличие пустого символа (длина меньше 1 символа)
      errorMessage = langNew.validationIn;
    } else {//условие, при котором проверяется поле названия c атрибутом name на соответствие длины символом (от 2 до 30)
      if (targetName == 'name' && (targetLength < 2 || targetLength > 30)) {
        errorMessage = langNew.validationLen;//сообщением, если введены символы в первое поле меньше 2 и больше 30

      } else if (targetName == 'link' && !urlPattern.test(targetValue)) {//условие, где проверяется поле ссылки c атрибутом name на соответствие ссылки
        errorMessage = langNew.validationLink;//сообщением об ошибке, если введена не ссылка
      }
    }
    target.nextElementSibling.innerHTML = errorMessage;//устанавливаем текст сообщения, элементу следующим за элементом в который вводим текст

    if (!errorMessage) {//условие, при котором появляется сообщением
      target.isValid = true;//сообщение не появилось, значит функция валидна
    } else {
      target.isValid = false;//сообщением появилось, значит функция не прошла валидацию
    }
    if (inputNameImg.isValid && inputLink.isValid) {//проверяется условия, где оба поля валидны,тогда
      saveImgBtn.disabled = false;//кнопка становится активной
    } else {
      saveImgBtn.disabled = true;//кнопка заблокируется
    }
  };
})();
