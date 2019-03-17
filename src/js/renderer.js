export default class Renderer {
  constructor (ctx, cell, settings) {
    this._ctx = ctx;
    this._cell = cell;
    this._settings = settings;
  }
  get ctx () {
    return this._ctx;
  }
  get cell () {
    return this._cell;
  }
  get settings () {
    return this._settings;
  }
  render () {
    this.cell.list.forEach((row, x) => row.forEach((_cell, y) => {
      if (_cell === 1) {
        this.cell.draw(x, y);
      }
    }));
  }
  drawGrid () {
    this.ctx.fillStyle = this.settings.grid.color;
    for (let i = 1; i < this.settings.cell.count.y; i++) {
      this.ctx.fillRect(0, this.settings.cell.height * i + (i - 1), this.settings.base.width, 1);
    }
    for (let i = 1; i < this.settings.cell.count.x; i++) {
      this.ctx.fillRect(this.settings.cell.width * i + (i - 1), 0, 1, this.settings.base.height);
    }
  }
  clear () {
    this.ctx.save();
    this.ctx.fillStyle = this.settings.base.color;
    this.ctx.fillRect(0, 0, this.settings.base.width, this.settings.base.height);
    this.drawGrid();
    this.ctx.restore();
  }
}