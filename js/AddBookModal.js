import BookCard from "./BookCard.js";

export default class AddBookModal {

  constructor(library, cardParentElement, bookDetailsPane) {
    this.library = library;
    this.cardParentElement = cardParentElement;
    this.bookDetailsPane = bookDetailsPane;
    this.dialog = document.getElementById("new-book-modal");
    this.form = document.getElementById("book-details-form");
    this.openButton = document.getElementById("add-book-btn");
    this.closeButton = document.getElementById("modal-close-btn");
    this.submitButton = document.getElementById("book-submit");
    this.readCheckbox = document.getElementById("read");

    this.bindEvents();
  }

  open() {
    this.dialog?.showModal();
  }

  close() {
    this.dialog?.close();
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

    this.library.addBookToLibrary(bookData.title, bookData.author, bookData.description, bookData.read, bookData.img);

    const newBook = this.library.booksList[this.library.booksList.length - 1]
    new BookCard(newBook, this.library, this.bookDetailsPane, this.cardParentElement, imgUrl);

    this.form.reset();
    this.close();
  }

  isValidImageUrl(url) {
    const regex = /\.(jpg|jpeg|png|gif|bmp)$/i;
    if (!regex.test(url)) {
      alert('Please enter a valid image URL ending with .jpg, .jpeg, .png, .gif, or .bmp');
      return false;
    }

    return true;
  }

  getBookData() {
    return {
      title: document.getElementById('title').value.trim(),
      author: document.getElementById('author').value.trim(),
      description: document.getElementById('description').value.trim(),
      img: document.getElementById('imgUrl').value.trim(),
      read: this.readCheckbox.checked,
    };
  }

  isValidEntry({ title, author, description }) {
    const errors = [];

    if (!title) errors.push("Enter a title.");
    if (!author) errors.push("Enter an author.");
    if (!description) errors.push("Enter a description.");
    if (author && /\d/.test(author)) errors.push("Author name cannot contain numbers.");

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
    this.openButton?.addEventListener("click", () => this.open());
    this.closeButton?.addEventListener("click", () => this.close());
    this.submitButton?.addEventListener("click", (event) => this.submit(event));
  }
}
