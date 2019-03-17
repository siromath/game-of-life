export default class Util {
  constructor (settings) {
    this._settings = settings;
  }
  get settings () {
    return this._settings;
  }
  isValidPairAsPoint (x, y) {
    return 0 <= x && x < this.settings.cell.count.x && 0 <= y && y < this.settings.cell.count.y;
  }
  fillArray (value) {
    return Array.from(new Array(this.settings.cell.count.x), () => new Array(this.settings.cell.count.y).fill(value));
  }
}