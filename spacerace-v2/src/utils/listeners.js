export const listeners = {
  onDocumentKeyDown: function (event, that) {
    const keyCode = event.which;
    if (keyCode == 38) {
      // up key
      that.ship.upPressed = true;
    } else if (keyCode == 40) {
      // down key
      that.ship.downPressed = true;
    } else if (keyCode == 39) {
      // right key
      that.ship.rightPressed = true;
    } else if (keyCode == 37) {
      // left key
      that.ship.leftPressed = true;
    } else if (keyCode == 32) {
      // space bar
      that.ship.boost();
    }
  },
  onDocumentKeyUp: function (event, that) {
    event.preventDefault();
    const keyCode = event.which;
    if (keyCode == 38) {
      // up key
      event.preventDefault();
      that.ship.upPressed = false;
    } else if (keyCode == 40) {
      // down key
      event.preventDefault();
      that.ship.downPressed = false;
    } else if (keyCode == 39) {
      // right key
      event.preventDefault();
      that.ship.rightPressed = false;
    } else if (keyCode == 37) {
      // left key
      event.preventDefault();
      that.ship.leftPressed = false;
    }
  }
};

