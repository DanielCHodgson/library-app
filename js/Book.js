export default class Book {

    constructor(id, title, author, description, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }

}