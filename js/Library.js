import Book from "./Book.js";

export default class Library {
  #booksList;
  #index;

  constructor() {
    this.#booksList = [];
    this.#index = 1;
    this.#addTestBooks();
    this.dummyCard = document.querySelector(".dummy-card");
  }

  addBook(book) {
    this.#booksList.push(book);
    this.#index += 1;
  }

  removeBook(id) {
    this.#booksList = this.#booksList.filter((book) => book.getId() !== id);
  }

  getBookById(id) {
    return this.#booksList.find((book) => String(book.getId()) === String(id));
  }

  getBooks() {
    return this.#booksList;
  }

  getIndex() {
    return this.#index;
  }

  moveLastItem() {
    const gridContainer = document.querySelector(".books-list");

    if (this.dummyCard) {
      this.dummyCard.remove();
      gridContainer.appendChild(this.dummyCard);
    }
  }

  toggleCardsFocus(book) {
    this.#booksList
      .filter((otherBook) => otherBook.getId() !== book.getId())
      .map((otherBook) => otherBook.getCard().getElement())
      .forEach((card) => {
        card.classList.contains("unfocussed")
          ? card.classList.remove("unfocussed")
          : card.classList.add("unfocussed");
      });
  }

  // method for adding dummy data
  #addTestBooks() {
    this.addBook(
      new Book(
        this.#index,
        "The Lord of the Rings",
        "J.R.R Tolkien",
        "In The Lord of the Rings, the hobbit Frodo Baggins, along with the fellowship, embarks on a perilous journey to destroy the powerful one ring, facing dark forces and forming unlikely alliances to save Middle-earth from evil.",
        false,
        "url('./res/LotR-cover.jpg')"
      )
    );

    this.addBook(
      new Book(
        this.#index,
        "Crime and Punishment",
        "Fyodor Dostoevsky",
        "In Crime and Punishment, troubled student Raskolnikov commits a murder, believing he's above the law. As guilt and paranoia consume him, he grapples with his conscience and the moral consequences of his actions.",
        false,
        "url('./res/Crime-and-punishment-cover.jpg')"
      )
    );

    this.addBook(
      new Book(
        this.#index,
        "Harry Potter ",
        "J.K Rowling",
        "Harry Potter, a young wizard, discovers his magical heritage and attends Hogwarts, where he uncovers secrets about his past and faces dark forces while trying to protect the Philosopher's Stone.",
        false,
        "url('./res/Harry-Potter.jpeg')"
      )
    );

    this.addBook(
      new Book(
        this.#index,
        "A Game of Thrones",
        "George R. R. Martin",
        "Noble families fight for control of the Iron Throne in a brutal power struggle, while ancient threats and the arrival of winter loom over the Seven Kingdoms, pushing alliances to their limits.",
        false,
        "url('./res/GameofThrones.jpeg')"
      )
    );

    this.addBook(
      new Book(
        this.#index,
        "1984",
        "George Orwell",
        "In a dystopian society ruled by the Party and Big Brother, Winston Smith secretly rebels against the oppressive regime's constant surveillance, mind control, and manipulation of truth and reality.",
        false,
        "url('./res/1984.jpeg')"
      )
    );
    this.addBook(
      new Book(
        this.#index,
        "The Handmaid’s Tale",
        "Margaret Atwood",
        "In The Handmaid’s Tale, in a dystopian society where women’s rights are stripped away, Offred, a handmaid, struggles to survive under oppressive rule while secretly resisting the totalitarian regime.",
        false,
        "url('./res/HandmaidsTale.jpeg')"
      )
    );

    this.addBook(
      new Book(
        this.#index,
        "Fear and loathing in Las Vegas",
        "Hunter S. Thompson",
        "Fear and Loathing in Las Vegas by Hunter S. Thompson follows journalist Raoul Duke and his attorney Dr. Gonzo as they embark on a drug-fueled trip to Las Vegas, exploring the chaos of the American Dream.",
        false,
        "url('./res/fear-and-loathing.jpeg')"
      )
    );
  }
}
