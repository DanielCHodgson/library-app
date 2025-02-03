class Library {

    booksList = [];

    constructor() {
        this.booksList = this.booksList;
    }

    addBookToLibrary(title, author, published) {
       this.booksList.push(new Book(title, author, published))
    }

    removeBookFromLibrary(bookToRemove) {
        this.booksList = this.booksList.filter(book => book != bookToRemove);
     }

}