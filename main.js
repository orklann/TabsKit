function init() {
  console.log("Main loaded");

  var canvas = document.getElementById('tabs-canvas');
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    render();
  }

  function render() {
    var ctx = canvas.getContext('2d');
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.style.width = window.innerWidth + "px";

    var t = new Tab(canvas);
    t.draw(true);
  }

  render();
}

var tabNumber = 0;
const tabHeight = 28;
const tabWidth = 80;
const defaultTabBackground = "#cecccf";
const activeTabBackground = "white";
const deltaXForTabs = 5;
const radius = 4;

var Tab = function(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.tabNumber = tabNumber + 1;

  this.tabRect = {};
  this.tabRect.x = (this.tabNumber - 1) * tabWidth;
  this.tabRect.y = tabHeight - 0.5;
  this.tabRect.width = tabWidth;
  this.tabRect.height = tabHeight;

  this.draw = function(active) {
    this.ctx.save();

    const midX = this.tabRect.x + (this.tabRect.width / 2);
    const midY = this.tabRect.y - (this.tabRect.height / 2);
    const minX = this.tabRect.x;
    const minY = this.tabRect.y - this.tabRect.height;
    const maxX = this.tabRect.x + this.tabRect.width;
    const maxY = this.tabRect.y;

    const bottomLeft = {x: this.tabRect.x, y: this.tabRect.y};
    const topLeft = {
      x: this.tabRect.x,
      y: this.tabRect.y - this.tabRect.height
    };
    const bottomRight = {
      x: this.tabRect.x + this.tabRect.width,
      y: this.tabRect.y
    };
    const topRight = {
      x: this.tabRect.x + this.tabRect.width,
      y: this.tabRect.y - this.tabRect.height
    };

    // We use arcTo(x1, y1, x2, y2, radius) to construct rounded corners
    // See http://www.dbp-consulting.com/tutorials/canvas/CanvasArcTo.html
    if (active) {
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'red';
      this.ctx.globalAlpha = 1.0;

      // bottom arc
      this.ctx.moveTo(bottomLeft.x, bottomLeft.y);
      this.ctx.arcTo(bottomLeft.x + deltaXForTabs + radius, maxY,
         bottomLeft.x + deltaXForTabs + radius, midY, radius);

      // top left arc
      this.ctx.arcTo(minX + deltaXForTabs + radius, minY, midX, minY, radius);
      this.ctx.stroke();
    } else {

    }
    this.ctx.restore();
  }
}

init();
