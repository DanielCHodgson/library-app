import BookCard from "./BookCard.js";
import Library from "./Library.js";
import AddBookModal from "./AddBookModal.js";
import BookDetailsPane from "./BookDetailsPane.js";

const library = new Library();
const bookDetailsPane = new BookDetailsPane(
  library,
  document.querySelector(".book-details-pane")
);
const modal = new AddBookModal(
  library,
  document.querySelector(".books-list"),
  bookDetailsPane
);

library.getBooks().forEach((book) => {
  new BookCard(
    book,
    library,
    bookDetailsPane,
    document.querySelector(".books-list")
  );
});

library.dummyCard.addEventListener("click", () => modal.open());
