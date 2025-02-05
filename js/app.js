import BookCard from "./BookCard.js";
import Library from "./Library.js";
import NewBookModal from "./NewBookModal.js";
import BookDetilsPane from "./BookDetailsPane.js"

const bookDetailsPane = new BookDetilsPane(document.querySelector(".book-details-pane"));

const library = new Library();
const modal = new NewBookModal(library, document.querySelector(".books-list"), bookDetailsPane);

library.booksList.forEach(book => {
    new BookCard(book, library, bookDetailsPane, document.querySelector(".books-list"))
});
