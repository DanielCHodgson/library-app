import Utility from "./Utility.js";

export default class BookCard {
    #book;
    #library;
    #detailsPane;
    #parent;
    #element;
    #deleteBtn;
    #readIconContainer;
    #isClickOnReadIcon;

    constructor(book, library, detailsPane, parent) {
        this.#book = book
        this.#library = library;
        this.#detailsPane = detailsPane;
        this.#parent = parent || document.querySelector(".books-list");
        this.#element = this.#createElement();
        this. #isClickOnReadIcon = false;
        this.#bindCardToBook(book);
        this.#bindEvents();
        this.render(this.#element);
    }

    #createElement() {

        const id = this.#book.id;
        const img = this.#book.img;

        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.bookId = id;
        if (img) this.setBackgorundImage(img, card);

        const icons = document.createElement("div");
        icons.classList.add("card-icons");
        icons.appendChild(this.#createReadIcon());
        icons.appendChild(this.#createDeleteBtn());

        card.appendChild(icons);

        if (img === "") card.appendChild(this.#createAltText());

        return card;
    }

    readIconSvgString() {

        return this.#book.read ?
            `<svg class="read-icon" width="2rem" height="2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M23.5,17L18.5,22L15,18.5L16.5,17L18.5,19L22,15.5L23.5,17M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,17C12.5,17 12.97,16.93 13.42,16.79C13.15,17.5 13,18.22 13,19V19.45L12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5C17,4.5 21.27,7.61 23,12C22.75,12.64 22.44,13.26 22.08,13.85C21.18,13.31 20.12,13 19,13C18.22,13 17.5,13.15 16.79,13.42C16.93,12.97 17,12.5 17,12A5,5 0 0,0 12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17Z" />
        </svg>` :
            `<svg class="unread-icon"  width="2rem" height="2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" />
        </svg>`;
    }

    #bindCardToBook() {
        this.#book.card = this;
    }

    setBackgorundImage(img, card) {
        const bg = Utility.wrapInUrl(img)
        card.style.backgroundImage = bg;
        card.style.backgroundSize = "cover"
        card.style.backgroundPosition = "center"
    }

    #createAltText() {
        const altTextArea = document.createElement("div");
        altTextArea.classList.add("card-alt-text");

        const altText = document.createElement("p");
        altText.textContent = this.#book.title;

        altTextArea.appendChild(altText);
        return altTextArea;
    }

    toggleReadIcon() {
        this.#readIconContainer.replaceWith(this.#createReadIcon());
    }

    #createReadIcon() {
        const readIconContainer = document.createElement("div");
        readIconContainer.classList.add("read-icon-container");

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.readIconSvgString().trim();
        const readIcon = tempDiv.firstChild;

        readIconContainer.appendChild(readIcon);
        this.#readIconContainer = readIconContainer;
        return readIconContainer;
    }

    toggleRead() {
        this.#book.toggleRead();
        this.toggleReadIcon();
    }

    #createDeleteBtn() {
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("card-delete-btn");
        deleteBtn.textContent = "✖";
        this.#deleteBtn = deleteBtn;
        return deleteBtn;
    }

    deleteCard(event) {
        const id = this.#element.dataset.bookId;
        const book = this.#library.getBookById(id);

        this.#library.removeBook(id);
        this.#library.toggleCardsFocus(book);
        if (this.#detailsPane.isActive) this.#detailsPane.togglePane();
        book.destroy();
        event.stopPropagation();
    }

    #bindEvents() {
        this.#element.addEventListener("mouseenter", () => this.#handleMouseEnter());
        this.#element.addEventListener("mouseleave", () => this.#handleMouseLeave());
        this.#element.addEventListener("click", () => this.#handleCardClick());
        this.#deleteBtn.addEventListener("click", (event) => this.#handleDeleteClick(event));
        this.#readIconContainer.addEventListener("click", (event) => this.#handleReadIconClick(event));
        this.#readIconContainer.addEventListener("click", () => this.#handleReadIconMouseLeave());
    }


    #handleMouseEnter = () => {
        if (this.#isClickOnReadIcon) return;
        this.#library.toggleCardsFocus(this.#book);
    };

    #handleMouseLeave = () => {
        if (this.#isClickOnReadIcon) return;
        this.#library.toggleCardsFocus(this.#book);
    };

    #handleCardClick() {
        this.#detailsPane.setDetails(this.#book);
        if (!this.#detailsPane.isActive) this.#detailsPane.togglePane();
    }

    #handleDeleteClick(event) {
        this.deleteCard(event);
    }

    #handleReadIconClick(event) {
        this.toggleRead();
        this.#detailsPane.toggleReadStatus();
        this.#isClickOnReadIcon = true;
        event.stopPropagation();
    }

    #handleReadIconMouseLeave() {
        this.#isClickOnReadIcon = false;
    }

    render(card) {
        this.#parent.appendChild(card);
        this.#library.moveLastItem();
    }

    destroy() {
        this.#element.remove();
        this.#element.removeEventListener("mouseenter", handleMouseEnter);
        this.#element.removeEventListener("mouseleave", handleMouseLeave);
        this.#element.removeEventListener("click", () => this.#handleCardClick());
        this.#deleteBtn.removeEventListener("click", (event) => this.#handleDeleteClick(event));
        this.#readIconContainer.removeEventListener("click", (event) => this.#handleReadIconClick(event));
        this.#readIconContainer.removeEventListener("click", () => this.#handleReadIconMouseLeave());
        this.deleteBtn = null;
        this.#readIconContainer = null;
    }


    getElement() {
        return this.#element;
    }
}