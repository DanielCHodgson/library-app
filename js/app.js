import BookCard from "./BookCard.js";
import Library from "./Library.js";
import NewBookModal from "./NewBookModal.js";
import BookDetilsPane from "./BookDetailsPane.js"

const library = new Library();
const bookCardManager = new BookCard(library, new BookDetilsPane(document.querySelector(".book-details-pane")));
const modal = new NewBookModal(library, bookCardManager);
