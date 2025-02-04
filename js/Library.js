import Book from "./Book.js";

export default class Library {

    booksList = [];
    availableId = 1;

    constructor() {
        this.booksList = this.booksList;
        this.addTestBooks();
    }

    addBookToLibrary(title, author, description) {
        this.booksList.push(new Book(this.availableId, title, author, description))
        this.availableId += 1;
    }

    removeBookFromLibrary(id) {
        this.booksList = this.booksList.filter(book => book.id != id);
    }

    removeBookCardFromDom(id) {
        const card = document.querySelector(`[data-book-id="${id}"]`)

        if (card)
            card.remove();
    }

    addBookCardToDom(book, parentElement) {

        const { id, title, author, description } = book;

        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.bookId = id;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("card-delete-btn");
        deleteBtn.textContent = "X";
        deleteBtn.addEventListener("click", (event) => this.deleteCardFromDom(event));

        const cardTitle = document.createElement("h3");
        cardTitle.classList.add("book-title");
        cardTitle.textContent = title;

        const cardAuthor = document.createElement("p");
        cardAuthor.classList.add("book-author");
        cardAuthor.textContent = author;

        const cardDesc = document.createElement("p");
        cardDesc.classList.add("book-desc");
        cardDesc.textContent = description;

        card.appendChild(deleteBtn);
        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
        card.appendChild(cardDesc);

        parentElement.appendChild(card);
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
        this.addBookToLibrary("The Lord of the Rings", "J.R.R Tolkien", "An epic adventure split across three novels. Follows the fellowship as they quest across Middle Earth to destroy the one ring.");
        this.addBookCardToDom(this.booksList[this.booksList.length - 1], document.querySelector(".books-list"))
    }

}