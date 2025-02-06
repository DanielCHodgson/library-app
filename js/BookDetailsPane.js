export default class BookDetailsPane {

    constructor(library, containerElement) {
        this.library = library;
        this.containerElement = containerElement;
        this.isActive = false;
        this.currentBook = null;
        this.#bindEvents();
    }

    togglPane() {
        this.containerElement.classList.toggle("active");
        if (this.isActive) this.currentBook = null;
        this.isActive = !this.isActive;
    }


    setDetails(book) {
        if (!this.containerElement) return;
        this.#setBookDetails(book);
    }


    #setBookDetails(book) {
        this.currentBook = book;

        const title = document.querySelector(".book-title");
        title.textContent = this.currentBook.title;

        const author = document.querySelector(".book-author");
        author.textContent = this.currentBook.author;

        const desc = document.querySelector(".book-desc");
        desc.textContent = this.currentBook.description;
    }

    #bindEvents() {

        const closeButton = document.getElementById("close-pane");
        closeButton.addEventListener("click", () => {
            this.togglPane();
        });
    }
}