export default class Utility {
  static wrapInUrl(string) {
    const regex = /^url\(['"][^'"]+['"]\)$/i;
    if (regex.test(string)) {
      return string;
    } else {
      return `url('${string}')`;
    }
  }
}
