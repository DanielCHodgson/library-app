import Book from "./Book.js";

export default class Library {

    booksList = [];
    availableID = 1;

    constructor() {
        this.booksList = this.booksList;
    }

    addBookToLibrary(title, author, description) {
        this.booksList.push(new Book(this.availableID, title, author, description))
        this.availableID += 1;
    }

    removeBookFromLibrary(id) {
        this.booksList = this.booksList.filter(book => book.id != id);
    }

    removeBookCardFromDom(id) {
        const card = document.querySelector(`[data-book-i-d="${id}"]`)

        if (card)
            card.remove();
    }

    addBookCardToDom(book, parentElement) {

        const { id, title, author, description } = book;
   
        let card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.bookID = id;

        let cardTitle = document.createElement("h3");
        cardTitle.classList.add("book-title");
        cardTitle.textContent = title;

        let cardAuthor = document.createElement("p");
        cardAuthor.classList.add("book-author");
        cardAuthor.textContent = author;

        let cardDesc = document.createElement("p");
        cardDesc.classList.add("book-desc");
        cardDesc.textContent = description;

        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
        card.appendChild(cardDesc);

        parentElement.appendChild(card);
    }

}