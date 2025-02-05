export default class BookCardManager {

    constructor(library, detailsPane, parentElement) {

        this.cardList = [];
        this.library = library;
        this.detailsPane = detailsPane;
        this.parentElement = parentElement || document.querySelector(".books-list");

        this.library.booksList.forEach(book => {
            this.addBookCardToDom(this.createBookCard(book));
        });
    }


    createBookCard(book) {
        const { id, title, author, description, img } = book;

        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.bookId = id;
        if (img) this.setBackgorundImage(img, card);

        card.appendChild(this.createDeleteBtn());
        this.handleCardSelected(card, book);
        return card;
    }

    addBookCardToDom(card) {
        this.cardList.push(card)
        this.parentElement.appendChild(card);
    }

    
    setBackgorundImage(img, card) {
        card.style.backgroundImage = img;
        card.style.backgroundSize = "cover"
        card.style.backgroundPosition = "center"
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

   
    toggleBookReadStatus(book) {
        this.library.toggleBookRead(book.id);
        this.updateReadStatusInDom(book);
    }

    updateReadStatusInDom(book) {
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


    handleCardSelected(card, book) {

        card.addEventListener("click", () => {
            this.detailsPane.setDetails(book);
            this.detailsPane.togglPane();
        });
    }
}