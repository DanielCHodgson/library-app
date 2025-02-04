import Book from "./Book.js";

export default class Library {

    constructor() {
        this.booksList = [];
        this.availableId = 1;
        this.addTestBooks();
    }

    addBookToLibrary(title, author, description, read) {
        this.booksList.push(new Book(this.availableId, title, author, description, read))
        this.availableId += 1;
    }

    removeBookFromLibrary(id) {
        this.booksList = this.booksList.filter(book => book.id !== id);
    }

    removeBookCardFromDom(id) {
        document.querySelector(`[data-book-id="${id}"]`)?.remove();
    }


    toggleBookRead(id) {
        const book = this.getBookById(id);
        book.toggleRead();
    }


    getBookById(id) {
        return this.booksList.find(book => book.id === id);
      }

    // method for adding dummy data
    addTestBooks() {
        this.addBookToLibrary(
            "The Lord of the Rings",
            "J.R.R Tolkien",
            "An epic adventure split across three novels. Follows the fellowship as they quest across Middle Earth to destroy the one ring.",
            false
        );

    }

}