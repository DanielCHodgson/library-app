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

    addBookCardToDom(book, parentElement) {

        const { id, title, author, description, read } = book;

        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.bookId = id;

        card.appendChild(this.createDeleteBtn());
        card.appendChild(this.createElement("h3", "book-title", title));
        card.appendChild(this.createElement("p", "book-author", `Author: ${author}`));
        card.appendChild(this.createElement("p", "book-desc", description));
        card.appendChild(this.createReadSection());



        parentElement.appendChild(card);
    }

    createElement(tag, className, textContent) {
        const element = document.createElement(tag);
        element.classList.add(className);
        element.textContent = textContent;
        return element;
    }

    createDeleteBtn() {
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("card-delete-btn");
        deleteBtn.textContent = "✖";
        deleteBtn.addEventListener("click", (event) => this.deleteCardFromDom(event));
        return deleteBtn;
    }

    createReadSection() {

        const readSection = document.createElement("div");
        readSection.classList.add("read-status-section");

        let setReadBtn = document.createElement("button");
        setReadBtn.id = "set-read";
        setReadBtn.textContent = "Read?"
        readSection.appendChild(setReadBtn);

        let readDisplay = read ? "✅" : "❌" ;
        readSection.appendChild(this.createElement("p", "read-status", readDisplay));

        return readSection;
    }


    deleteCardFromDom(event) {

        const deletebutton = event.target;
        const cardDiv = deletebutton.parentNode;
        const id = cardDiv.dataset.bookId;

        this.removeBookFromLibrary(id);
        this.removeBookCardFromDom(id);
    }


    // method for adding dummy data
    addTestBooks() {
        this.addBookToLibrary(
            "The Lord of the Rings",
            "J.R.R Tolkien",
            "An epic adventure split across three novels. Follows the fellowship as they quest across Middle Earth to destroy the one ring.",
            false
        );

        const lastBook = this.booksList[this.booksList.length - 1];
        this.addBookCardToDom(lastBook, document.querySelector(".books-list"));
    }

}