export default class FormValidator {
  static validateTitle(title) {
    if (!title.checkValidity()) {
      if (title.validity.valueMissing) {
        title.setCustomValidity("Title is a required field.");
      } else if (title.validity.tooShort) {
        title.setCustomValidity(
          `Title should be at least ${title.minLength} characters.`
        );
      } else {
        title.setCustomValidity("");
      }
      return false;
    }
    title.setCustomValidity("");
    return true;
  }

  static validateAuthor(author) {
    if (!author.checkValidity()) {
      if (author.validity.valueMissing) {
        author.setCustomValidity("Author is a required field.");
      } else if (author.validity.patternMismatch) {
        author.setCustomValidity("Author must contain only letters.");
      } else {
        author.setCustomValidity("");
      }
      return false;
    }
    author.setCustomValidity("");
    return true;
  }

  static validateDescription(desc) {
    if (!desc.checkValidity()) {
      if (desc.validity.valueMissing) {
        desc.setCustomValidity("Description is a required field.");
      } else if (desc.validity.tooShort) {
        desc.setCustomValidity(
          `Description must be at least ${desc.minLength} characters.`
        );
      } else {
        desc.setCustomValidity("");
      }
      return false;
    }
    desc.setCustomValidity("");
    return true;
  }

  static validateImgUrl(url) {
    if (!url.checkValidity()) {
      if (url.validity.valueMissing) {
        url.setCustomValidity("Image URL is a required field.");
      } else if (url.validity.typeMismatch) {
        url.setCustomValidity("Please enter a valid URL.");
      } else {
        url.setCustomValidity("");
      }
      return false;
    }
    url.setCustomValidity("");
    return true;
  }
}
