export default class BookDetailsPane {
  #library;
  #parent;
  #isActive;
  #currentBook;
  #currentCard;

  #closeBtn;
  #toggle;
  #title;
  #author;
  #desc;

  constructor(library, parent) {
    this.#library = library;
    this.#parent = parent;
    this.#isActive = false;
    this.#currentBook = null;
    this.#currentCard = null;
    this.#cacheElements();
    this.#bindEvents();
  }

  #cacheElements() {
    this.#closeBtn = document.getElementById("close-pane");
    this.#toggle = this.#parent.querySelector(".switch input");
    this.#title = document.querySelector(".book-title");
    this.#author = document.querySelector(".book-author");
    this.#desc = document.querySelector(".book-desc");
  }

  open(book) {
    this.setDetails(book);
    this.#isActive = true;
    this.#parent.classList.add("active");
  }
  
  close() {
    this.#parent.classList.remove("active");
    this.#isActive = false;
    this.#currentBook = null;
  }

  setDetails(book) {
    this.#setBookDetails(book);
    this.setToggleStatus();
  }

  setToggleStatus() {
    this.#currentBook.getIsRead()
      ? (this.#toggle.checked = true)
      : (this.#toggle.checked = false);
  }

  #setBookDetails(book) {
    this.#currentBook = book;
    this.#currentCard = book.getCard();
    this.#title.textContent = this.#currentBook.getTitle();
    this.#author.textContent = this.#currentBook.getAuthor();
    this.#desc.textContent = this.#currentBook.getDescription();
  }

  #bindEvents() {
    this.#closeBtn.addEventListener("click", () => this.close());
    this.#toggle.addEventListener("click", () => {
      this.#currentCard.toggleRead();
    });
  }
}
