export default class Settings {
  constructor () {
    this.cell = {
      color: '#000',
      count: {
        x: 30,
        y: 30
      },
      width: 10,
      height: 10
    }
    this.grid = {
      color: '#333'
    }
    this.base = {
      color: '#fff',
      width: (this.cell.count.x * this.cell.width) + (this.cell.count.x - 1),
      height: (this.cell.count.y * this.cell.height) + (this.cell.count.y - 1)
    }
  }
}