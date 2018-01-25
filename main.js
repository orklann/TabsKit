function init() {
  console.log("Main loaded");
  var canvas = document.getElementById('tabs-canvas');
  var t = new Tab(canvas);
}

var tabNumber = 0;
const tabHeight = 28;
const tabWidth = 80;
const defaultTabBackground = "#cecccf";
const activeTabBackground = "white";

var Tab = function(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.tabNumber = tabNumber + 1;

  this.tabRect = {};
  this.tabRect.x = (tabNumber - 1) * tabWidth;
  this.tabRect.y = tabHeight;
  this.tabRect.width = tabWidth;
  this.tabRect.height = tabHeight;

  this.draw = function(active) {
    this.ctx.save();

    if (active) {

    } else {

    }
    this.ctx.restore();
  }
}

init();
