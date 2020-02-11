export default class Popup {
  constructor(element, openClassName, closeElement) {
    this.element = element;
    this.openClassName = openClassName;
    closeElement.addEventListener("click", () => this.close());
  }

  open() {
    this.element.classList.add(this.openClassName);
  }

  close() {
    this.element.classList.remove(this.openClassName);
  }
}
// Это бесмыслено, вам необходимо почитать о наследовании и полиформизме в ооп
class PopupProfile extends Popup { }
class PopupCard extends Popup { }
class PopupImage extends Popup { }
