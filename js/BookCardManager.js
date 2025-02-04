export default class BookCardManager {

    constructor(library) {
        this.library = library;

        const books = this.library.booksList;

        books.forEach(book => {
            this.addBookCardToDom(book, document.querySelector(".books-list"))
        });
       
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
        deleteBtn.addEventListener("click", (event) => this.deleteCard(event));
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


    deleteCard(event) {

        const deletebutton = event.target;
        const cardDiv = deletebutton.parentNode;
        const id = cardDiv.dataset.bookId;

        this.library.removeBookFromLibrary(id);
        this.removeBookCardFromDom(id);
    }


}