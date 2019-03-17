export default class Controller {
  constructor (renderer, cell, util) {
    this._renderer = renderer;
    this._cell = cell;
    this._util = util;
    this._play;
    this._playing = false;
  }

  get renderer () {
    return this._renderer;
  }
  get cell () {
    return this._cell;
  }
  get util () {
    return this._util;
  }
  get play () {
    return this._play;
  }
  set play (arg) {
    this._play = arg;
  }
  get playing () {
    return this._playing;
  }
  set playing (arg) {
    this._playing = arg;
  }

  update () {
    let tmp = this.util.fillArray(0);
    this.cell.list.forEach((row, x) => row.forEach((_, y) => {
      tmp[x][y] = this.cell.isLiveNext(x, y) ? 1 : 0;
    }));
    this.cell.list = tmp;
  }
  start (speed) {
    if (this.playing) return;
    this.play = setInterval(() => {
      this.update();
      this.renderer.clear();
      this.renderer.render();
    }, speed);
    this.playing = true;
  }
  stop () {
    this.playing = false;
    clearInterval(this.play);
  }
  random () {
    this.renderer.clear();
    let tmp = this.util.fillArray(0);
    this.cell.list.forEach((row, x) => row.forEach((_, y) => {
      tmp[x][y] = Math.round(Math.random());
    }));
    this.cell.list = tmp;
    this.renderer.render();
  }
}