export default class Book {
  #id;
  #title;
  #author;
  #description;
  #isRead;
  #img;
  #card;

  constructor(id, title, author, description, isRead, img) {
    this.#id = id;
    this.#title = title;
    this.#author = author;
    this.#description = description;
    this.#isRead = isRead;
    this.#img = img;
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

  getImg() {
    return this.#img;
  }

  getCard() {
    return this.#card || null;
  }
  setCard(card) {
    return this.#card = card;
  }
}
