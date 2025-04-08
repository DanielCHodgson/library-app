export default class Book {
  #id;
  #title;
  #author;
  #description;
  #isRead;
  #imgUrl;
  #card;

  constructor(id, title, author, description, isRead, imgUrl) {
    this.#id = id;
    this.#title = title;
    this.#author = author;
    this.#description = description;
    this.#isRead = isRead;
    this.#imgUrl = imgUrl;
    this.#card = null;
  }

  toggleRead() {
    this.#isRead = !this.#isRead;
  }

  getId() {
    return this.#id;
  }

  getTitle() {
    return this.#title;
  }

  getAuthor() {
    return this.#author;
  }

  getDescription() {
    return this.#description;
  }
  getIsRead() {
    return this.#isRead;
  }

  getImgUrl() {
    return this.#imgUrl;
  }

  getCard() {
    return this.#card || null;
  }
  setCard(card) {
    return this.#card = card;
  }
}
