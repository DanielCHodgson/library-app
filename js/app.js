import BookCard from "./BookCard.js";
import Library from "./Library.js";
import NewBookModal from "./NewBookModal.js";
import BookDetilsPane from "./BookDetailsPane.js"

const bookDetailsPane = new BookDetilsPane(document.querySelector(".book-details-pane"));

const library = new Library();
const modal = new NewBookModal(library);

library.booksList.forEach(book => {

    const card = new BookCard(library, bookDetailsPane, document.querySelector(".books-list"))
});
