export default class BookCard {

    constructor(book, library, detailsPane, parentElement) {
        this.book = book
        this.library = library;
        this.detailsPane = detailsPane;
        this.parentElement = parentElement || document.querySelector(".books-list");
        this.card = this.#createCard(book);

        this.#bindToBook(book);
        this.#addToDom(this.card);
    }

    #createCard() {
        const { id, img } = this.book;

        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.bookId = id;
        if (img) this.setBackgorundImage(img, card);

        const icons = document.createElement("div");
        icons.classList.add("card-icons");

        const readIcon= this.#createReadIcon();
        icons.appendChild(readIcon);

        icons.appendChild(this.#createDeleteBtn());
        card.appendChild(icons);

        this.bindEvents(card,);
        return card;
    }

    getReadSvgString() {

        return this.book.read ?
            `<svg class="read-icon" width="2rem" height="2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M23.5,17L18.5,22L15,18.5L16.5,17L18.5,19L22,15.5L23.5,17M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,17C12.5,17 12.97,16.93 13.42,16.79C13.15,17.5 13,18.22 13,19V19.45L12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5C17,4.5 21.27,7.61 23,12C22.75,12.64 22.44,13.26 22.08,13.85C21.18,13.31 20.12,13 19,13C18.22,13 17.5,13.15 16.79,13.42C16.93,12.97 17,12.5 17,12A5,5 0 0,0 12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17Z" />
        </svg>` :
            `<svg class="unread-icon"  width="2rem" height="2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" />
        </svg>`;
    }

    #bindToBook() {
        this.book.card = this.card;
    }

    #addToDom(card) {
        this.parentElement.appendChild(card);
    }

    setBackgorundImage(img, card) {
        card.style.backgroundImage = img;
        card.style.backgroundSize = "cover"
        card.style.backgroundPosition = "center"
    }

    toggleReadIcon() {
        const icon = this.card.querySelector(".card-icons"); 
        icon.firstChild.replaceWith(this.#createReadIcon(this.book));
    }

    #createReadIcon() {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.getReadSvgString().trim();
        const readIcon = tempDiv.firstChild;

        readIcon.addEventListener("click", (event) => {
            this.toggleRead(this.book);
            event.stopPropagation();
        });
        return readIcon;
    }

    toggleRead() {
        this.book.read = !this.book.read;
        this.toggleReadIcon(); 
    }

    #createDeleteBtn() {
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("card-delete-btn");
        deleteBtn.textContent = "✖";
        deleteBtn.addEventListener("click", (event) => this.deleteCard(event));
        return deleteBtn;
    }

    /*

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

    */

    deleteCard(event) {
        const id = this.card.dataset.bookId;
        this.removeBookFromLibrary(id);
        this.removeBookCardFromDom(id);
        event.stopPropagation();
    }

    removeBookCardFromDom(id) {
        document.querySelector(`[data-book-id="${id}"]`)?.remove();
    }

    removeBookFromLibrary(id) {
        this.library.removeBookFromLibrary(id);
    }


    bindEvents(card) {
        this.handleCardHover(card,);
        this.handleCardSelected(card)
    }

    handleCardHover(card) {

        const handleMouseOver = () => {
            const otherCards = this.library.booksList
                .filter(otherBook => otherBook.id !== this.book.id)
                .map(otherBook => otherBook.card);

            otherCards.forEach(otherCard => otherCard.classList.add("unfocussed"));
        };

        const handleMouseOut = () => {
            const otherCards = this.library.booksList
                .filter(otherBook => otherBook.id !== this.book.id)
                .map(otherBook => otherBook.card);

            otherCards.forEach(otherCard => otherCard.classList.remove("unfocussed"));
        };

        card.addEventListener("mouseover", handleMouseOver);
        card.addEventListener("mouseout", handleMouseOut);
    }

    handleCardSelected(card) {

        card.addEventListener("click", () => {
            this.detailsPane.setDetails(this.book);
            if (!this.detailsPane.isActive)
                this.detailsPane.togglPane();
        });
    }
}