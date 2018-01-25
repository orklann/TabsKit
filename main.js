var tabNumber = 0;
const tabHeight = 22;
const tabWidth = 90;
const defaultTabbarBackground = "#cecccf";
const activeTabBackground = "white";
const deltaXForTabs = 2;
const deltaYForTabs = 3;
const radius = 4;
const leftPadding = 10;

var tabs = [];

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

  var canvas = document.getElementById('tabs-canvas');
  canvas.addEventListener("mousemove", onCanvasMouseMove);
  canvas.addEventListener("mousedown", onCanvasMouseDown);
}

function onCanvasMouseMove(event) {
  var canvas = document.getElementById('tabs-canvas');
  var pos = getMousePos(canvas, event);
  tabs.forEach(function(tab){
    tab.onMouseMove(pos);
  });
}

function onCanvasMouseDown(event) {
  var canvas = document.getElementById('tabs-canvas');
  var pos = getMousePos(canvas, event);
  tabs.forEach(function(tab){
    tab.onMouseDown(pos);
  });
}

function drawTabbar(attrs) {
  var canvas = document.getElementById('tabs-canvas');
  var ctx = canvas.getContext('2d');
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.style.width = window.innerWidth + "px";

  drawTabbarBottom(ctx);

  var t = new Tab(canvas, {title: "Main"});
  t.draw({highlightCloseButton: false});
  var t2 = new Tab(canvas, {title: "Typo"});
  t2.active = true;
  t2.draw({highlightCloseButton: false});
}

function drawTabbarBottom(ctx) {
  var canvas = document.getElementById('tabs-canvas');
  clear(canvas, defaultTabbarBackground);

  ctx.save();
  // Draw Tabbar bottom line
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#999999';
  const minX = 0;
  const maxX = parseInt(ctx.canvas.width);
  const maxY = parseInt(ctx.canvas.height) - 0.5;

  ctx.moveTo(minX, maxY - 0.5); // magic number: 5 to the same line width as Tab
  ctx.lineTo(maxX, maxY);
  ctx.stroke();

  ctx.restore();
}

function drawAllNormalTabs() {
  tabs.forEach(function(tab){
    if (!tab.active) {
      tab.draw({});
    }
  });
}

var Tab = function(canvas, params) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.tabNumber = tabNumber + 1;
  this.sepcialTab = false;
  this.title = params.title;
  this.active = false;
  tabs.push(this);

  this.tabRect =  function() {
    const index = tabs.indexOf(this);
    var rect = {};
    rect.x = index * tabWidth + leftPadding;
    rect.y = tabHeight;
    rect.width = tabWidth;
    rect.height = tabHeight - deltaYForTabs;
    return rect;
  }

  this.draw = function(attrs) {
    const midX = this.tabRect().x + (this.tabRect().width / 2);
    const midY = this.tabRect().y - (this.tabRect().height / 2);
    const minX = this.tabRect().x;
    const minY = this.tabRect().y - this.tabRect().height;
    const maxX = this.tabRect().x + this.tabRect().width;

    // -0.5 to feed canvas stroke API for perfect line width
    // noborderMaxY feed canvas fill API for whole fill
    const maxY = this.tabRect().y - 0.5;
    const noborderMaxY = this.tabRect().y;
    // We use arcTo(x1, y1, x2, y2, radius) to construct rounded corners
    // See http://www.dbp-consulting.com/tutorials/canvas/CanvasArcTo.html
    if (this.active) {
      this.ctx.save();

      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = '#999999';
      this.ctx.fillStyle = 'white';

      // Fill path
      this.ctx.beginPath();
      // bottom left arc
      this.ctx.moveTo(parseInt(minX) + 0, parseInt(noborderMaxY) + 0);
      this.ctx.arcTo(parseInt(minX + radius) + 0, parseInt(maxY) + 0,
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

      this.ctx.lineTo(parseInt(minX) + 0, parseInt(noborderMaxY) + 0);
      // close path and fill
      //this.ctx.closePath();
      this.ctx.fill();

      // --------------------
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

      this.ctx.stroke();
      this.ctx.restore();
    } else {
      this.ctx.save();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = '#999999';
      this.ctx.fillStyle = '#cecccf';

      /////////////////
      // Fill path
      this.ctx.beginPath();
      // move bottom left point
      this.ctx.moveTo(parseInt(minX) + 0, parseInt(noborderMaxY) + 0);
      //this.ctx.arcTo(parseInt(minX + radius) + 0, parseInt(minY) + 0,
      //   parseInt(minX + radius) + 0, parseInt(midY) + 0, radius);

      // top left arc
      this.ctx.arcTo(parseInt(minX) + 0, parseInt(minY) + 0,
       parseInt(midX) + 0, parseInt(minY) + 0, radius);

      // top right arc
      this.ctx.arcTo(parseInt(maxX + deltaXForTabs) + 0, parseInt(minY) + 0,
       parseInt(maxX + deltaXForTabs) + 0, parseInt(midY) + 0, radius);

      // line to bottom
      this.ctx.lineTo(parseInt(maxX + deltaXForTabs) + 0, parseInt(noborderMaxY) + 0);
      // close path and fill
      this.ctx.closePath();
      this.ctx.fill();

      // --------------------
      // Stroke the same path
      this.ctx.beginPath();
      // move bottom left point
      this.ctx.moveTo(parseInt(minX) + 0, parseInt(maxY) + 0);

      // top left arc
      this.ctx.arcTo(parseInt(minX) + 0, parseInt(minY) + 0,
       parseInt(midX) + 0, parseInt(minY) + 0, radius);

      // top right arc
      this.ctx.arcTo(parseInt(maxX + deltaXForTabs) + 0, parseInt(minY) + 0,
       parseInt(maxX + deltaXForTabs) + 0, parseInt(midY) + 0, radius);

      // line to bottom
      this.ctx.lineTo(parseInt(maxX + deltaXForTabs) + 0, parseInt(maxY) + 0);

      // line to bottom left
      this.ctx.lineTo(parseInt(minX) + 0, parseInt(maxY) + 0);
      this.ctx.stroke();

      this.ctx.restore();
    }
    this.drawCloseButton(attrs.highlightCloseButton);
  }

  this.drawCloseButton = function(hightlight){
    this.ctx.save();
    var rect = this.closeButtonRect();

    const minX = rect.x;
    const maxX = rect.x + rect.width;
    const minY = rect.y;
    const maxY = rect.y + rect.height;

    if (hightlight) {
      this.ctx.strokeStyle = "#999999";
    } else {
      this.ctx.strokeStyle = "#cecccf";
    }

    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(minX, minY);
    this.ctx.lineTo(maxX, maxY);
    this.ctx.moveTo(minX, maxY);
    this.ctx.lineTo(maxX, minY);
    this.ctx.stroke();
    this.ctx.restore();
  }

  this.closeButtonRect = function() {
    const width = 6;
    const height = 6;
    const leftMargin = 10;

    const minX = this.tabRect().x ;
    const maxY = this.tabRect().y;
    const x = minX + leftMargin;
    const y = maxY - ((tabHeight - deltaYForTabs - height) / 2) - height;

    return {x: x, y: y, width: width, height: height};
  }

  this.onMouseMove = function(p) {
    if (!this.active) return ;
    drawTabbarBottom(this.ctx);
    drawAllNormalTabs();
    if (pointInRect(p, this.closeButtonRect())) {
      this.draw({highlightCloseButton: true})
    } else{
      this.draw({highlightCloseButton: false});
    }
  }

  this.onMouseDown = function(p) {
    if (pointInRect(p, this.closeButtonRect())) {
      // TODO: handle close button clicking here
      console.log('Mouse click on close button');
    }
  }
}

init();
