export default class BookcontainerElement {

    constructor(containerElement) {
        this.containerElement = containerElement;
    }

    togglPane() {
        this.containerElement.classList.toggle("active");
    }


    setDetails(book) {

        if (!this.containerElement) return;

        this.containerElement.querySelectorAll(".book-details").forEach(div => div.remove());

        const cardDetails = document.createElement("div");
        cardDetails.classList.add("book-details");

        cardDetails.appendChild(this.createElement("h3", "book-title", book.title));
        cardDetails.appendChild(this.createElement("p", "book-author", book.author));
        cardDetails.appendChild(this.createElement("p", "book-desc", book.description));
        cardDetails.appendChild(this.createReadSection(book));

        this.containerElement.appendChild(cardDetails);

        return cardDetails;
    }

    createElement(tag, className, textContent) {
        const element = document.createElement(tag);
        element.classList.add(className);
        element.textContent = textContent;
        return element;
    }

    createReadSection(book) {
        const readSection = document.createElement("div");
        readSection.classList.add("read-status-section");

        let setReadBtn = document.createElement("button");
        setReadBtn.id = "set-read";
        setReadBtn.textContent = book.read ? "Mark Unread" : "Mark Read";
        setReadBtn.addEventListener("click", () => this.toggleBookReadStatus(book));

        readSection.appendChild(setReadBtn);
        readSection.appendChild(this.createElement("p", "read-status", book.read ? "✅" : "❌"));

        return readSection;
    }

    styleUnselectedCards(currentCard) {
        //this.cardList.find(card => card !== currentCard).forEach(card=> 
        //card.classList.add("") )
    }


}