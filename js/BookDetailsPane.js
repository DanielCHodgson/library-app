export default class BookDetailsPane {
  #library;
  #parent;
  #isActive;
  #currentBook;
  #currentCard;

  constructor(library, parent) {
    this.#library = library;
    this.#parent = parent;
    this.#isActive = false;
    this.#currentBook = null;
    this.#currentCard = null;
    this.#bindEvents();
  }

  togglePane() {
    this.#parent.classList.toggle("active");
    if (this.#isActive) this.#currentBook = null;
    this.#isActive = !this.#isActive;
  }

  setDetails(book) {
    if (!this.#parent) return;
    this.#setBookDetails(book);
    this.setToggleStatus();
  }

  setToggleStatus() {
    const toggle = document.querySelector(".book-details-pane input");
    this.#currentBook.read ? (toggle.checked = true) : (toggle.checked = false);
  }

  #setBookDetails(book) {
    this.#currentBook = book;
    this.#currentCard = book.card;

    const title = document.querySelector(".book-title");
    title.textContent = this.#currentBook.title;

    const author = document.querySelector(".book-author");
    author.textContent = this.#currentBook.author;

    const desc = document.querySelector(".book-desc");
    desc.textContent = this.#currentBook.description;
  }

  #bindEvents() {
    const closeButton = document.getElementById("close-pane");
    closeButton.addEventListener("click", () => this.togglePane());

    const toggle = this.#parent.querySelector(".switch input");
    toggle.addEventListener("click", () => this.#currentCard.toggleRead());
  }
}
