const urlPattern = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/;

export default class Validation {
  constructor(words) {
    this.words = words;
    this.validateProfile = this.validateProfile.bind(this);
    this.validateImg = this.validateImg.bind(this);
  }

  validateImg({ target }) {
    const popupName = document.querySelector(".popup__input_type_name");
    const popupButton = document.querySelector(".popup__button");
    const popupLink = document.querySelector(".popup__input_type_link-url");
    let errorMessage = "";
    const targetLength = target.value.length;
    const targetName = target.name;
    const targetValue = target.value;

    if (!targetLength) {
      errorMessage = this.words.requiredField;
    } else {
      if (targetName == "name" && (targetLength < 2 || targetLength > 30)) {
        errorMessage = this.words.requiredLength;
      } else if (targetName == "link" && !urlPattern.test(targetValue)) {
        errorMessage = this.words.requiredLink;
      }
    }
    target.nextElementSibling.innerHTML = errorMessage;

    if (!errorMessage) {
      target.isValid = true;
    } else {
      target.isValid = false;
    }
    if (popupName.isValid && popupLink.isValid) {
      popupButton.disabled = false;
    } else {
      popupButton.disabled = true;
    }
  }

  validateProfile(event) {
    const editButton = document.getElementById("save-profile");
    const popupEdit = document.querySelector(".popup-edit")
    const popupEditAbout = popupEdit.querySelector(".popup-edit__input_type_about");;
    const popupEditName = popupEdit.querySelector(".popup-edit__input_type_name");
    const len = event.target.value.length;
    const lenN = popupEditName.value.length;
    const lenA = popupEditAbout.value.length;

    let message = "";

    if (!len) {
      message = this.words.requiredField;
    } else if (len < 2 || len > 30) {
      message = this.words.requiredLength;
    }
    if (lenN < 2 || lenN > 30 || lenA < 2 || lenA > 30) {
      editButton.disabled = true;
    } else {
      // можно вынести из else перенеся строчку в начало функции
      editButton.disabled = false;
    }
    event.target.nextElementSibling.innerText = message;
  }
}
