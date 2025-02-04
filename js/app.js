import BookCardManager from "./BookCardManager.js";
import Library from "./Library.js";
import NewBookModal from "./NewBookModal.js";

const library = new Library();
const bookCardManager = new BookCardManager(library);
const modal = new NewBookModal(library, bookCardManager);
