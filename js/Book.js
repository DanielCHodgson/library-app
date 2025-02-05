export default class Book {

    constructor(id, title, author, description, read, img) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.read = read;
        this.img = img;
        this.card= null;
    }

    toggleRead() {
        this.read = !this.read;
    }

}