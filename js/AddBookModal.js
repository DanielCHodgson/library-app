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
  #fields;
  #isReadCheckbox;
  #errors;

  constructor(library, parent, detailsPane) {
    this.#library = library;
    this.#parent = parent;
    this.#detailsPane = detailsPane;
    this.#errors = [];
    this.#cacheElements();
    this.#bindEvents();
  }

  #cacheElements() {
    this.#dialog = document.getElementById("new-book-modal");
    this.#form = document.getElementById("book-details-form");
    this.#openBtn = document.getElementById("add-book-btn");
    this.#closeBtn = document.getElementById("modal-close-btn");
    this.#submitBtn = document.getElementById("book-submit");
    this.#fields = {
      title: document.getElementById("title"),
      author: document.getElementById("author"),
      description: document.getElementById("description"),
      img: document.getElementById("imgUrl"),
    };
    this.#isReadCheckbox = document.getElementById("read");
  }

  #bindEvents() {
    this.#openBtn?.addEventListener("click", () => this.open());
    this.#closeBtn?.addEventListener("click", () => this.close());
    this.#submitBtn?.addEventListener("click", (event) => this.submit(event));

    for (const [fieldName, element] of Object.entries(this.#fields)) {
      element?.addEventListener("input", () =>
        this.#validateField(fieldName, element)
      );
    }
  }

  #validateField(fieldName, element) {
    const validationMap = {
      title: FormValidator.validateTitle,
      author: FormValidator.validateAuthor,
      description: FormValidator.validateDescription,
      img: FormValidator.validateImgUrl,
    };

    const isValid = validationMap[fieldName](element);
    const errorElement = element.nextElementSibling;

    if (!isValid) {
      this.#errors.push(element.validationMessage);
      this.#fields[fieldName].classList.add("error");
      if (errorElement) errorElement.textContent = element.validationMessage;
    } else {
      if (errorElement) errorElement.textContent = "";
      this.#fields[fieldName].classList.remove("error");
    }
  }

  open() {
    this.#dialog?.showModal();
  }

  close() {
    this.#dialog?.close();
  }

  submit(event) {
    event.preventDefault();
    this.#errors = [];

    for (const [fieldName, element] of Object.entries(this.#fields)) {
      this.#validateField(fieldName, element);
    }

    if (this.#errors.length > 0) return;

    const data = this.#getBookData();
    const newBook = new Book(
      this.#library.getIndex(),
      data.title,
      data.author,
      data.description,
      data.read,
      data.img
    );

    this.#library.addBook(newBook);

    new BookCard(
      newBook,
      this.#library,
      this.#detailsPane,
      this.#parent,
    );

    this.#form.reset();
    this.close();
  }

  #getBookData() {
    return {
      title: this.#fields.title.value.trim(),
      author: this.#fields.author.value.trim(),
      description: this.#fields.description.value.trim(),
      img: this.#fields.img.value.trim(),
      read: this.#isReadCheckbox.checked,
    };
  }
}
