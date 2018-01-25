var tabNumber = 0;
const tabHeight = 22;
const tabWidth = 90;
const defaultTabBackground = "#cecccf";
const activeTabBackground = "white";
const deltaXForTabs = 5;
const deltaYForTabs = 3;
const radius = 4;
const leftPadding = 10;

function init() {
  console.log("Main loaded");
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    render();
  }

  function render() {
    drawTabbar();
  }

  render();
}

function drawTabbar() {
  var canvas = document.getElementById('tabs-canvas');
  var ctx = canvas.getContext('2d');
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.style.width = window.innerWidth + "px";

  ctx.save();
  // Draw Tabbar bottom line
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#999999';
  const minX = 0;
  const maxX = parseInt(ctx.canvas.width);
  const minY = parseInt(ctx.canvas.height) - 0.5;

  ctx.moveTo(minX, minY - 0.5); // magic number: 5 to the same line width as Tab
  ctx.lineTo(maxX, minY);
  ctx.stroke();

  ctx.restore();

  var t = new Tab(canvas);
  t.draw(true);
}

var Tab = function(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.tabNumber = tabNumber + 1;

  this.tabRect = {};
  this.tabRect.x = (this.tabNumber - 1) * tabWidth + leftPadding;
  this.tabRect.y = tabHeight;
  this.tabRect.width = tabWidth;
  this.tabRect.height = tabHeight - deltaYForTabs;

  this.draw = function(active) {
    this.ctx.save();

    const midX = this.tabRect.x + (this.tabRect.width / 2);
    const midY = this.tabRect.y - (this.tabRect.height / 2);
    const minX = this.tabRect.x;
    const minY = this.tabRect.y - this.tabRect.height;
    const maxX = this.tabRect.x + this.tabRect.width;

    // -0.5 to feed canvas stroke API for perfect line width
    // noborderMaxY feed canvas fill API for whole fill
    const maxY = this.tabRect.y - 0.5;
    const noborderMaxY = this.tabRect.y;
    // We use arcTo(x1, y1, x2, y2, radius) to construct rounded corners
    // See http://www.dbp-consulting.com/tutorials/canvas/CanvasArcTo.html
    if (active) {
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = '#999999';
      this.ctx.fillStyle = 'white';

      // Fill path
      this.ctx.beginPath();
      // bottom left arc
      this.ctx.moveTo(parseInt(minX) + 0, parseInt(noborderMaxY) + 0);
      this.ctx.arcTo(parseInt(minX + radius) + 0, parseInt(noborderMaxY) + 0,
         parseInt(minX + radius) + 0, parseInt(midY) + 0, radius);

      // top left arc
      this.ctx.arcTo(parseInt(minX + radius) + 0, parseInt(minY) + 0,
       parseInt(midX) + 0, parseInt(minY) + 0, radius);

      // top right arc
      this.ctx.arcTo(parseInt(maxX - radius) + 0, parseInt(minY) + 0,
       parseInt(maxX - radius) + 0, parseInt(midY) + 0, radius);

      // bottom right arc
      this.ctx.arcTo(parseInt(maxX - radius) + 0, parseInt(noborderMaxY) + 0,
        parseInt(maxX) + 0, parseInt(noborderMaxY) + 0, radius);

      // close path and fill
      this.ctx.closePath();
      this.ctx.fill();

      // Stroke the same path
      this.ctx.beginPath();
      // bottom left arc
      this.ctx.moveTo(parseInt(minX) + 0, parseInt(maxY) + 0);
      this.ctx.arcTo(parseInt(minX + radius) + 0, parseInt(maxY) + 0,
         parseInt(minX + radius) + 0, parseInt(midY) + 0, radius);

      // top left arc
      this.ctx.arcTo(parseInt(minX + radius) + 0, parseInt(minY) + 0,
       parseInt(midX) + 0, parseInt(minY) + 0, radius);

      // top right arc
      this.ctx.arcTo(parseInt(maxX - radius) + 0, parseInt(minY) + 0,
       parseInt(maxX - radius) + 0, parseInt(midY) + 0, radius);

      // bottom right arc
      this.ctx.arcTo(parseInt(maxX - radius) + 0, parseInt(maxY) + 0,
        parseInt(maxX) + 0, parseInt(maxY) + 0, radius);

      this.ctx.lineTo(parseInt(maxX + 100) + 0, parseInt(maxY) + 0);

      this.ctx.stroke();
    } else {

    }
    this.ctx.restore();
  }
}

init();
