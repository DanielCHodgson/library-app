import Book from "./Book.js";

export default class Library {

    constructor() {
        this.booksList = [];
        this.availableId = 1;
        this.#addTestBooks();
    }

    addBookToLibrary(title, author, description, read, img) {
        this.booksList.push(new Book(this.availableId, title, author, description, read, img))
        this.availableId += 1;
    }

    removeBookFromLibrary(id) {
        this.booksList = this.booksList.filter(book => book.id !== id);
    }

    getBookById(id) {
        return this.booksList.find(book => book.id === id);
    }

    moveLastItem() {
        const gridContainer = document.querySelector('.books-list');
        const dummyCard = gridContainer.querySelector(".dummy-card");

        if (dummyCard) {
            dummyCard.remove()
            gridContainer.appendChild(dummyCard);
        }
    }

    // method for adding dummy data
    #addTestBooks() {
        this.addBookToLibrary(
            "The Lord of the Rings",
            "J.R.R Tolkien",
            "In The Lord of the Rings, the hobbit Frodo Baggins, along with the fellowship, embarks on a perilous journey to destroy the powerful one ring, facing dark forces and forming unlikely alliances to save Middle-earth from evil.",
            false,
            "url('./res/LotR-cover.jpg')"
        );

        this.addBookToLibrary(
            "Crime and Punishment",
            "Fyodor Dostoevsky",
            "In Crime and Punishment, troubled student Raskolnikov commits a murder, believing he's above the law. As guilt and paranoia consume him, he grapples with his conscience and the moral consequences of his actions.",
            false,
            "url('./res/Crime-and-punishment-cover.jpg')"
        );

        this.addBookToLibrary(
            "Harry Potter ",
            "J.K Rowling",
            "Harry Potter, a young wizard, discovers his magical heritage and attends Hogwarts, where he uncovers secrets about his past and faces dark forces while trying to protect the Philosopher's Stone.",
            false,
            "url('./res/Harry-Potter.jpeg')"
        );

        this.addBookToLibrary(
            "A Game of Thrones",
            "George R. R. Martin",
            "Noble families fight for control of the Iron Throne in a brutal power struggle, while ancient threats and the arrival of winter loom over the Seven Kingdoms, pushing alliances to their limits.",
            false,
            "url('./res/GameofThrones.jpeg')"
        );

        this.addBookToLibrary(
            "1984",
            "George Orwell",
            "In a dystopian society ruled by the Party and Big Brother, Winston Smith secretly rebels against the oppressive regime's constant surveillance, mind control, and manipulation of truth and reality.",
            false,
            "url('./res/1984.jpeg')"
        );
        this.addBookToLibrary(
            "The Handmaid’s Tale",
            "Margaret Atwood",
            "In The Handmaid’s Tale, in a dystopian society where women’s rights are stripped away, Offred, a handmaid, struggles to survive under oppressive rule while secretly resisting the totalitarian regime.",
            false,
            "url('./res/Handmaids-tale.jpeg')"
        );

        this.addBookToLibrary(
            "Fear and loathing in Las Vegas",
            "Hunter S. Thompson",
            "Fear and Loathing in Las Vegas by Hunter S. Thompson follows journalist Raoul Duke and his attorney Dr. Gonzo as they embark on a drug-fueled trip to Las Vegas, exploring the chaos of the American Dream.",
            false,
            "url('./res/fear-and-loathing.jpeg')"
        );
    }
}