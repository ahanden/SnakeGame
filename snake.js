/**
 * Create a new game of snake.
 *
 * This snake game uses vanilla JS compatable as far back as IE8. The game does
 * require use of either the arrow keys or WASD, so it is not compatible with
 * mobile devices. When providing an element as the container, make sure the
 * element is focusable in order for key pressed to be detected (tabindex="0").
 *
 * @param {Node} container   The Dom node to put the game in.
 * @param {int} width        The number of cells wide to make the board.
 * @param {int} height       The number of cells tall to make the board.
 * @param {int} speed        The refresh rate of the board in milliseconds.
 */
function SnakeGame(container, width, height, speed) {
  this.width     = width;
  this.height    = height;
  this.container = container;

  // Self reference
  var sg        = this;

  // Compute cell border width
  var dummy = document.createElement("div");
  dummy.className = "snake-cell";
  container.append(dummy);
  var full_width = dummy.offsetWidth;
  var trimmed_width = dummy.clientWidth;

  // Determine the cell dimensions.
  // (Cells are always perfect squares)
  var border = full_width - trimmed_width
  var cell_size = (container.clientWidth / this.width - border) + "px";
  
  // Empty the container
  while(container.hasChildNodes())
      container.removeChild(container.lastChild);

  // Add the grid elements
  this.grid = []
  for(var i = 0; i < height; i++) {
    var row = [];
    var container_row = document.createElement("div");
    container_row.className = "snake-row";
    for(var j = 0; j < width; j++) {
      var cell = document.createElement("div");
      cell.style.width      = cell_size;
      cell.style.paddingTop = cell_size;
      container_row.appendChild(cell);
      row.push(cell)
    }
    this.container.appendChild(container_row);
    this.grid.push(row);
  }

  // Initialize the game
  this.reset();

  // Add the listener to allow user movement
  container.onkeypress = function(e){
    e = e || window.event;
    sg.redirect(e);
  }

  // Start the animation/movement loop
  window.setInterval(function(){ sg.move(); sg.draw(); }, speed);

  // Request focus
  this.container.focus();
}

/**
 * Resets/restarts the game.
 */
SnakeGame.prototype.reset = function() {
  // Initialize food position
  this.food_x = Math.floor(this.width / 4);
  this.food_y = Math.floor(this.height / 2);

  // Initialize snake position
  this.snake = [
    {
      "x": Math.floor(3 * this.width / 4),
      "y": Math.floor(this.height / 2)
    }
  ];

  // Initialize direction
  this.dx = -1;
  this.dy = 0;
  
  this.draw();
}

/**
 * Internal method to update the grid contents.
 */
SnakeGame.prototype.draw = function() {

  // Clear the board
  for(var i = 0; i < this.height; i++) {
    for(var j = 0; j < this.width; j++) {
      this.grid[i][j].className = "snake-cell";
    }
  }

  // Draw the snake
  var sg = this;
  this.snake.forEach(function(element){
    sg.grid[element.y][element.x].className = "snake-cell snake-body";
  });

  // Draw the food
  this.grid[this.food_y][this.food_x].className = "snake-cell snake-food";
}

/**
 * Internal method for the main loop of the game.
 *
 * This method moves the snake, generates food,
 * and detects end-game conditions.
 */
SnakeGame.prototype.move = function() {
  var head = {
    "x": this.snake[0].x + this.dx,
    "y": this.snake[0].y + this.dy
  };

  if(head.x >= this.width || 
      head.y >= this.height || 
      head.x < 0 || 
      head.y < 0) {
    this.reset();
    return;
  }

  for(var i = 0; i < this.snake.length; i++) {
    if(head.x == this.snake[i].x && head.y == this.snake[i].y) {
      this.reset();
      return;
    }
  }

  if(head.x == this.food_x && head.y == this.food_y) {
    this.food_x = Math.floor(Math.random() * (this.width - 1));
    this.food_y = Math.floor(Math.random() * (this.height - 1));
  }
  else
    this.snake.pop();

  this.snake.unshift(head);
}

/**
 * Internal method to change the snake's direction.
 *
 * The snake can be moved by either the arrow keys or WASD.
 *
 * @param {keypress}   Keypress event for redirection
 */
SnakeGame.prototype.redirect = function(e) {
  var key = "";
  if(e.keyCode == 0)
    key = e.key.toLowerCase();
  else {
    switch(e.keyCode) {
      case 37:
        key = "a";
        break;
      case 38:
        key = "w";
        break;
      case 39:
        key = "d";
        break;
      case 40:
        key = "s";
        break;
    }
  }

  switch(key) {
    case "w":
      if(this.snake.length == 1 || this.snake[0].y - 1 != this.snake[1].y) {
        this.dx = 0;
        this.dy = -1;
      }
      break;
    case "s":
      if(this.snake.length == 1 || this.snake[0].y + 1 != this.snake[1].y) {
        this.dx = 0;
        this.dy = 1;
      }
      break;
    case "a":
      if(this.snake.length == 1 || this.snake[0].x - 1 != this.snake[1].x) {
        this.dx = -1;
        this.dy = 0;
      }
      break;
    case "d":
      if(this.snake.length == 1 || this.snake[0].x + 1 != this.snake[1].x) {
        this.dx = 1;
        this.dy = 0;
      }
      break;
  }
}
