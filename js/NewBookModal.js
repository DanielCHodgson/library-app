export default class NewBookModal {

  constructor() {
    this.dialog = document.getElementById("new-book-modal");
    this.form = document.getElementById("book-details");
    this.openButton = document.getElementById("add-book");
    this.closeButton = document.getElementById("modal-close-btn");
    this.submitButton = document.getElementById("book-submit");

    this.bindEvents();
  }


  open() {
    this.dialog.showModal();
  }

  close() {
    this.dialog.close();
  }

  submit(event) {
    event.preventDefault();

   
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;

    const authorPattern = /^[^0-9]*$/;
    
    if (!authorPattern.test(author)) {
      alert("The author name cannot contain numbers.");
      return; 
    }


    this.form.reset();
    console.log("sumbitted!")
  }

  bindEvents() {

    this.openButton.addEventListener("click", () => this.open());
    this.closeButton.addEventListener("click", () => this.close());
    this.submitButton.addEventListener("click", (event) => this.submit(event))
    this.dialog.addEventListener("click", (event) => {
      if (event.target === this.dialog) {
        
        this.form.reset();
        this.close();
      }
    });
  }
}