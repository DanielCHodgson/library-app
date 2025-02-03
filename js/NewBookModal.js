export default class NewBookModal {

  constructor() {
    this.dialog = document.getElementById("new-book-modal");
    this.openButton = document.getElementById("add-book");
    this.closeButton = document.getElementById("modal-close-btn");

    this.bindEvents();
  }


  open() {
    this.dialog.showModal();
  }

  close() {
    this.dialog.close();
  }


  bindEvents() {

    this.openButton.addEventListener('click', () => this.open());
    this.closeButton.addEventListener('click', () => this.close());
    this.dialog.addEventListener('click', (event) => {
      if (event.target === this.dialog) {
        this.close();
      }
    });


  }
}