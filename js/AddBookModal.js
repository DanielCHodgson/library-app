import BookCard from "./BookCard.js";
import Book from "./Book.js";
import FormValidator from "./FormValidator.js";

export default class AddBookModal {
  #library;
  #parent;
  #detailsPane;
  #dialog;
  #form;
  #openBtn;
  #closeBtn;
  #submitBtn;
  #title;
  #author;
  #description;
  #imgUrl;
  #isReadCheckbox;

  constructor(library, parent, detailsPane) {
    this.#library = library;
    this.#parent = parent;
    this.#detailsPane = detailsPane;
    this.#cachElements();
    this.bindEvents();
  }

  #cachElements() {
    this.#dialog = document.getElementById("new-book-modal");
    this.#form = document.getElementById("book-details-form");
    this.#openBtn = document.getElementById("add-book-btn");
    this.#closeBtn = document.getElementById("modal-close-btn");
    this.#submitBtn = document.getElementById("book-submit");
    this.#title = document.getElementById("title");
    this.#author = document.getElementById("author");
    this.#description = document.getElementById("description");
    this.#imgUrl = document.getElementById("imgUrl");
    this.#isReadCheckbox = document.getElementById("read");
  }

  open() {
    this.#dialog?.showModal();
  }

  close() {
    this.#unbindEvents();
    this.#dialog?.close();
  }

  submit(event) {
    event.preventDefault();

    const bookData = this.getBookData();
    if (!this.isValidEntry(bookData)) return;

    this.#library.addBook(
      new Book(
        bookData.title,
        bookData.author,
        bookData.description,
        bookData.read,
        bookData.img
      )
    );

    new BookCard(
      this.#library.getBooks()[this.#library.getBooks().length - 1],
      this.#library,
      this.#detailsPane,
      this.#parent,
      imgUrl
    );
    this.#form.reset();
    this.close();
  }


  getBookData() {
    return {
      title: this.#title.value.trim(),
      author: this.#author.value.trim(),
      description: this.#description.value.trim(),
      img: this.#imgUrl.value.trim(),
      read: this.#isReadCheckbox.checked,
    };
  }

  isValidEntry() {
    const errors = [];
  
    const titleValid = FormValidator.validateTitle(this.#title);
    if (!titleValid) errors.push(this.#title.validationMessage);
  
    const authorValid = FormValidator.validateAuthor(this.#author);
    if (!authorValid) errors.push(this.#author.validationMessage);
  
    const descriptionValid = FormValidator.validateDescription(this.#description);
    if (!descriptionValid) errors.push(this.#description.validationMessage);

    const imgUrlValid = FormValidator.validateImgUrl(this.#imgUrl);
    if (!imgUrlValid) errors.push(this.#imgUrl.validationMessage);
  
    if (errors.length > 0) {
      this.showErrorMessages(errors);
      return false;
    }
  
    return true;
  }

  showErrorMessages(errors) {
    const errorMessage = errors.join("\n");
    alert(errorMessage);
  }

  bindEvents() {
    this.#openBtn?.addEventListener("click", () => this.open());
    this.#closeBtn?.addEventListener("click", () => this.close());
    this.#submitBtn?.addEventListener("click", (event) => this.submit(event));
  }

  #unbindEvents() {
    this.#openBtn?.addEventListener("click", () => this.open());
    this.#closeBtn?.addEventListener("click", () => this.close());
    this.#submitBtn?.addEventListener("click", (event) => this.submit(event));
  }
}
