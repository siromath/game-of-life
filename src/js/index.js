import '../css/style.scss';

import Settings from './settings';
import Util from './util';
import Cell from './cell';
import Renderer from './renderer';
import Controller from './controller';
import handler from './handler';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const settings = new Settings();
const util = new Util(settings);
const cell = new Cell(ctx, settings, util);
const renderer = new Renderer(ctx, cell, settings);
const controller = new Controller(renderer, cell, util);
handler(controller);

let init = () => {
  canvas.width = settings.base.width;
  canvas.height = settings.base.height;
  cell.fill()
  renderer.drawGrid();
  renderer.render();
}

init();