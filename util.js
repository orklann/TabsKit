function getMousePos(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

function pointInRect(p, rect) {
  const minX = rect.x;
  const minY = rect.y;
  const maxX = rect.x + rect.width;
  const maxY = rect.y + rect.height;

  if (p.x >= minX && p.x <= maxX && p.y >= minY && p.y <= maxY) {
    return true;
  }
  return false;
}

function clear(canvas, color) {
  const ctx = canvas.getContext('2d');
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

Array.prototype.remove = function(el) {
  var i = this.indexOf(el);
  if(i != -1) {
	   this.splice(i, 1);
   }
}
