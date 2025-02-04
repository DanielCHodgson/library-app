export default class BookCardManager {

    constructor(library, parentElement) {
        this.library = library;
        this.parentElement = parentElement || document.querySelector(".books-list");

        this.library.booksList.forEach(book => {
            this.addBookCardToDom(book);
        });
    }

    addBookCardToDom(book) {
        const { id, title, author, description } = book;

        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.bookId = id;

        card.appendChild(this.createDeleteBtn());
        card.appendChild(this.createElement("h3", "book-title", title));
        card.appendChild(this.createElement("p", "book-author", `Author: ${author}`));
        card.appendChild(this.createElement("p", "book-desc", description));
        card.appendChild(this.createReadSection(book));

        this.parentElement.appendChild(card);
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
        deleteBtn.addEventListener("click", (event) => this.deleteCard(event));
        return deleteBtn;
    }

    createReadSection(book) {
        const readSection = document.createElement("div");
        readSection.classList.add("read-status-section");

        let setReadBtn = document.createElement("button");
        setReadBtn.id = "set-read";
        setReadBtn.textContent = book.read ? "Mark Unread" : "Mark Read";
        setReadBtn.addEventListener("click", () => this.toggleReadStatus(book));

        readSection.appendChild(setReadBtn);
        readSection.appendChild(this.createElement("p", "read-status", book.read ? "✅" : "❌"));

        return readSection;
    }


    toggleReadStatus(book) {
        this.library.toggleBookRead(book.id);
        this.updateReadInDom(book);
    }

    updateReadInDom(book) {
        const card = this.parentElement.querySelector(`[data-book-id="${book.id}"]`);
        const statusText = card.querySelector(".read-status");
        statusText.textContent = book.read ? "✅" : "❌";
        const readBtn = card.querySelector("#set-read");
        readBtn.textContent = book.read ? "Mark Unread" : "Mark Read";
    }


    deleteCard(event) {
        const deletebutton = event.target;
        const cardDiv = deletebutton.parentNode;
        const id = cardDiv.dataset.bookId;

        this.removeBookFromLibrary(id);
        this.removeBookCardFromDom(id);
    }

    removeBookCardFromDom(id) {
        document.querySelector(`[data-book-id="${id}"]`)?.remove();
    }

    removeBookFromLibrary(id) {
        this.library.removeBookFromLibrary(id);
    }
}