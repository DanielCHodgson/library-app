import BookCard from "./BookCard.js";

export default class AddBookModal {
  #library;
  #parent;
  #detailsPane;
  #dialog;
  #form;
  #openBtn;
  #closeBtn;
  #submitBtn;
  #isReadCheckbox;

  constructor(library, parent, detailsPane) {
    this.#library = library;
    this.#parent = parent;
    this.#detailsPane = detailsPane;
    this.#cachElements;
    this.bindEvents();
  }

  #cachElements() {
    this.#dialog = document.getElementById("new-book-modal");
    this.#form = document.getElementById("book-details-form");
    this.#openBtn = document.getElementById("add-book-btn");
    this.#closeBtn = document.getElementById("modal-close-btn");
    this.#submitBtn = document.getElementById("book-submit");
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

    let imgUrl = "";

    if (bookData.img) {
      if (this.isValidImageUrl(bookData.img)) {
        imgUrl = bookData.img;
      } else {
        return;
      }
    }

    this.#library.addBook(
      bookData.title,
      bookData.author,
      bookData.description,
      bookData.read,
      bookData.img
    );

    const newBook = this.#library.booksList[this.#library.booksList.length - 1];
    new BookCard(
      newBook,
      this.#library,
      this.#detailsPane,
      this.#parent,
      imgUrl
    );
    this.#form.reset();
    this.close();
  }

  isValidImageUrl(url) {
    const regex = /\.(jpg|jpeg|png|gif|bmp)$/i;
    if (!regex.test(url)) {
      alert(
        "Please enter a valid image URL ending with .jpg, .jpeg, .png, .gif, or .bmp"
      );
      return false;
    }

    return true;
  }

  getBookData() {
    return {
      title: document.getElementById("title").value.trim(),
      author: document.getElementById("author").value.trim(),
      description: document.getElementById("description").value.trim(),
      img: document.getElementById("imgUrl").value.trim(),
      read: this.#isReadCheckbox.checked,
    };
  }

  isValidEntry({ title, author, description }) {
    const errors = [];

    if (!title) errors.push("Enter a title.");
    if (!author) errors.push("Enter an author.");
    if (!description) errors.push("Enter a description.");
    if (author && /\d/.test(author))
      errors.push("Author name cannot contain numbers.");

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
