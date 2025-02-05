export default class BookcontainerElement {

    constructor(containerElement) {
        this.containerElement = containerElement;
        this.isActive = false;
    }

    togglPane() {
        this.containerElement.classList.toggle("active");
        this.isActive = !this.isActive;
    }


    setDetails(book) {
        if (!this.containerElement) return;
        this.#setBookDetails(book);
        this.#setReadSection(book);
    }


    #setBookDetails(book) {

        const title = document.querySelector(".book-title");

        console.log(title)
        title.textContent = book.title;

        const author = document.querySelector(".book-author");
        author.textContent = book.author;

        const desc = document.querySelector(".book-desc");
        desc.textContent = book.description;  
    }


    #setReadSection(book) {
        const setReadBtn = document.getElementById("set-read");
        setReadBtn.textContent = book.read ? "Mark Unread" : "Mark Read";
        setReadBtn.addEventListener("click", () => this.toggleBookReadStatus(book));

        const readStatus = document.querySelector(".read-status")
        readStatus.textContent = book.read ? "✅" : "❌";
    }

    #styleUnselectedCards(currentCard) {
        //this.cardList.find(card => card !== currentCard).forEach(card=> 
        //card.classList.add("") )
    }


}