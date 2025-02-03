import Library from "./Library.js";

const library = new Library();

const addBookBtn = document.getElementById('add-book');

addBookBtn.addEventListener('click', function() {
   openAddBookModal();
});


function openAddBookModal() {

    console.log("modal opened!");
}



function addBookCard(title, author, description) {

    let card = document.createElement("div");
    card.classList.add("book-card"); 

    let cardTitle = document.createElement("h3");
    cardTitle.classList.add("book-title");
    cardTitle.textContent = title;

    let cardAuthor = document.createElement("p");
    cardAuthor.classList.add("book-author");
    cardAuthor.textContent = author;

    let cardDesc = document.createElement("p");
    cardDesc.classList.add("book-desc");
    cardDesc.textContent = description;

    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    card.appendChild(cardDesc);

    document.querySelector(".book-list").appendChild(card);
}