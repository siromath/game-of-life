export default class Cell {
  constructor (ctx, settings, util) {
    this._ctx = ctx;
    this._settings = settings;
    this._util = util;
    this._list = this.util.fillArray(0);
  }

  get ctx () {
    return this._ctx;
  }
  get settings () {
    return this._settings;
  }
  get util () {
    return this._util;
  }
  get list () {
    return this._list;
  }
  set list (array) {
    this._list = array;
  }

  fill (value = 0) {
    this._list = this.util.fillArray(value);
  }
  draw (x, y) {
    if (!this.util.isValidPairAsPoint(x, y)) return;
    this.ctx.save();
    this.list[x][y] = 1;
    this.ctx.fillStyle = this.settings.cell.color;
    this.ctx.fillRect((this.settings.cell.width * x) + x, (this.settings.cell.height * y) + y, this.settings.cell.width, this.settings.cell.height);
    this.ctx.restore();
  }
  clear (x, y) {
    if (!this.util.isValidPairAsPoint(x, y)) return;
    this.ctx.save();
    this.list[x][y] = 0;
    this.ctx.fillStyle = this.settings.base.color;
    this.ctx.fillRect((this.settings.cell.width * x) + x, (this.settings.cell.height * y) + y, this.settings.cell.width, this.settings.cell.height);
    this.ctx.restore();
  }
  get (x, y) {
    if (this.util.isValidPairAsPoint(x, y)) return this.list[x][y];
  }
  isLive (x, y) {
    return this.get(x, y) === 1;
  }
  liveCount (cells) {
    let count = 0;
    cells.forEach(row => row.forEach(cell => {
      if (cell === 1) {
        count++;
      }
    }));
    return count;
  }
  around (x, y) {
    return [
      [this.get(x - 1, y - 1), this.get(x, y - 1), this.get(x + 1, y - 1)],
      [this.get(x - 1, y), 0, this.get(x + 1, y)],
      [this.get(x - 1, y + 1), this.get(x, y + 1), this.get(x + 1, y + 1)]
    ];
  }
  isLiveNext (x, y) {
    if (!this.util.isValidPairAsPoint(x, y)) return;
    let count = this.liveCount(this.around(x, y));
    return (this.isLive(x, y) && (count === 2 || count === 3)) || (!this.isLive(x, y) && count === 3);
  }
  drawByUser (e) {
    let pointX = e.clientX - e.target.offsetLeft;
    let pointY = e.clientY - e.target.offsetTop;
    let x = Math.floor(pointX / (this.settings.cell.width + 1));
    let y = Math.floor(pointY / (this.settings.cell.height + 1));
    this.draw(x, y);
  }
  clearByUser (e) {
    let pointX = e.clientX - e.target.offsetLeft;
    let pointY = e.clientY - e.target.offsetTop;
    let x = Math.floor(pointX / (this.settings.cell.width + 1));
    let y = Math.floor(pointY / (this.settings.cell.height + 1));
    this.clear(x, y);
  }
}