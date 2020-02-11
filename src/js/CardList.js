export default class CardList {
  constructor(cardClass, api) {
    this.cardClass = cardClass;
    this.api = api;
  }

  render(container, cards) {

    for (let card of cards) {
      const newCard = new this.cardClass(card, this.api);
      container.appendChild(newCard.cardElement);
    }
  }
}
