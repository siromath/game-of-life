import $ from 'jquery';

export default function events(controller) {
  $('#play').on('click', function () {
    if (!controller.playing) {
      controller.start($('#speed').val());
      $(this).text('stop');
    } else {
      controller.stop();
      $(this).text('start');
    }
  });

  $('#random').on('click', function () {
    controller.random();
  });

  $('#reset').on('click', function () {
    controller.cell.fill()
    controller.renderer.clear();
  });

  let draw = true;

  $('#draw').on('click', function () {
    draw = !draw;
    if (draw) {
      $(this).text('draw');
    } else {
      $(this).text('clear');
    }
  });

  $('#speed').on('input', function () {
    let value = $(this).val();
    $('#speedDisplay').text(value);
    if (!controller.playing) return;
    clearInterval(controller.play);
    controller.play = setInterval(() => {
      controller.update();
      controller.renderer.clear();
      controller.renderer.render();
    }, value);
  });

  let mouseDowning = false;

  $('#canvas').on('mousedown', function (e) {
    mouseDowning = true;
    if (draw) {
      controller.cell.drawByUser(e);
    } else {
      controller.cell.clearByUser(e);
    }
  });

  $('#canvas').on('mouseup', function () {
    mouseDowning = false;
  });

  $('#canvas').on('mousemove', function (e) {
    if (!mouseDowning) return;
    if (draw) {
      controller.cell.drawByUser(e);
    } else {
      controller.cell.clearByUser(e);
    }
  });
}
