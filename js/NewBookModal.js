import Book from "./Book.js";

export default class NewBookModal {

  constructor(library) {
    this.library = library;
    this.dialog = document.getElementById("new-book-modal");
    this.form = document.getElementById("book-details");
    this.openButton = document.getElementById("add-book");
    this.closeButton = document.getElementById("modal-close-btn");
    this.submitButton = document.getElementById("book-submit");

    this.bindEvents();
  }

  open() {
    this.dialog.showModal();
  }

  close() {
    this.dialog.close();
  }

  submit(event) {
    event.preventDefault();

    const books = this.library.booksList;

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;


    if (!this.isValidEntry(title, author, description)) {
      return;
    }

    this.library.addBookToLibrary(title, author, description)
    this.library.addBookCardToDom(books[books.length - 1], document.querySelector(".books-list"));
    this.form.reset();
  }

  isValidEntry(title, author, description) {

    if (title.length <= 0) {
      alert("Enter a title");
      return false;
    }

    if (author.length <= 0) {
      alert("Enter an author");
      return false;
    }

    if (description.length <= 0) {
      alert("Enter an author");
      return false;
    }

    const authorPattern = /^[^0-9]*$/;

    if (!authorPattern.test(author)) {
      alert("The author name cannot contain numbers");
      return false;
    }

    return true;
  }

  bindEvents() {

    this.openButton.addEventListener("click", () => this.open());
    this.closeButton.addEventListener("click", () => this.close());
    this.submitButton.addEventListener("click", (event) => this.submit(event))
    this.dialog.addEventListener("click", (event) => {
      if (event.target === this.dialog) {

        this.form.reset();
        this.close();
      }
    });
  }
}