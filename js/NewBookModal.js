import BookCard from "./BookCard.js";

export default class NewBookModal {

  constructor(library, cardParentElement, bookDetailsPane) {
    this.library = library;
    this.cardParentElement = cardParentElement;
    this.bookDetailsPane = bookDetailsPane;
    this.dialog = document.getElementById("new-book-modal");
    this.form = document.getElementById("book-details");
    this.openButton = document.getElementById("add-book");
    this.closeButton = document.getElementById("modal-close-btn");
    this.submitButton = document.getElementById("book-submit");
    this.deleteButtons = document.getElementsByClassName("card-delete-btn");
    this.readCheckbox = document.getElementById("read");

    this.bindEvents();
  }

  open() {
    this.dialog.showModal();
  }

  close() {
    this.dialog.close();
  }

  submit(event, card) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;
    const read = this.readCheckbox.checked;

    if (!this.isValidEntry(title, author, description))
      return;

    this.library.addBookToLibrary(title, author, description, read);
    const bookJustAdded = this.library.booksList[this.library.booksList.length -1];
    new BookCard(bookJustAdded, this.library, this.bookDetailsPane, this.cardParentElement)

    this.form.reset();
    this.close();
  }

  isValidEntry(title, author, description) {

    title = title.trim();
    author = author.trim();
    description = description.trim();

    const errors = [];

    if (!title) errors.push("Enter a title.");
    if (!author) errors.push("Enter an author.");
    if (!description) errors.push("Enter a description.");

    if (author && /\d/.test(author)) {
      errors.push("The author name cannot contain numbers.");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return false;
    }

    return true;
  }

  bindEvents() {
    this.openButton.addEventListener("click", () => this.open());
    this.closeButton.addEventListener("click", () => this.close());
    this.submitButton.addEventListener("click", (event) => this.submit(event));
  }
}