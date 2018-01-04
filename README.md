# Snake Game
This is a browser-based game of Snake that can be inserted into a webpage with
just a few lines of code.

## Setup
You will need both the `snake.js` and the `style.css` files included in your
HTML code.

```HTML
<link href="style.css" rel="stylesheet">
<script type="text/javascript" src="snake.js"></script>
```

To create a snake game, call the game constructor with the DOM element that
should contain the game, the game's width, height, and speed (in milliseconds).

The easieset way to do this is via the `onload` attribute of the body element.

```HTML
<body onload="new SnakeGame(document.getElementById('snake-game'), 20, 20, 100);">
```

*Note:* If you choose an element for the game that is not focusable, the game
will not work. You can make an element focusable by adding the attribute
`tabindex="0"`.

## Configuration
You can configure the play area and speed of the game in the JavaScript
contructor (see Setup).

You can further change the game's appearance by modifing the `style.css` file.

*Note:* Do not add any padding or margins to the game cells or rows. However, you can
alter the snake-cell border width without issue.

## Demo
Feel free to checkout the `demo.html` file to see how everything fits together.
