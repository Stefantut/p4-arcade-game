'use strict'

// size for Boundary canvas
const canvasBoundary = {
    w: 500,
    h: 500
};

// vertical alignment correction factor for enemy-player 
const c = 50;

// Get the modal
var modal = document.getElementById('bestModal');

// Get the modal's close button
var buttons = document.getElementById('button');

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	
	// The enemy's position and speed
    this.x = x;
    this.y = y;
    this.s = 100 + Math.floor(Math.random() * 300);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.s * dt;
	
	// If it reaches the end of the track 
	// will reset the enemy's position and speed 
    if (this.x > canvasBoundary.w) {
        this.x = 0;
        this.s = 100 + Math.floor(Math.random() * 300);
    };

    // Detects collision 
    if (this.x - player.x < c && this.x - player.x > -c && this.y === player.y) {
            player.resetPlayer();    
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.sprite = 'images/char-horn-girl.png';
        this.x = x;
        this.y = y;
        this.w = 60;
        this.h = 60;
    }
    // Update the player's position 
    update() {}

    // Render the player
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Bring the player to the start position
    resetPlayer() {
        this.x = 200;
        this.y = 350;
    }
    // Change player's position using the keyboard arrow keys
    handleInput (key) {
        switch (key) {
            case 'left': 
                if(this.x > 0) {
                    this.x += - this.w;
                }; 
                break;
            case 'right': 
                if(this.x < canvasBoundary.w - this.w) {
                    this.x += + this.w;
                }; 
                break;
            case 'up':                 
                if (this.y > 0) {
                    this.y += - this.h;
                };
                break;
            case 'down': 
                if(this.y < 350) {
                    this.y += + this.h;
                };
                break;
        };

        // If the player crossed, show modal and reset the game
		if (this.y < c) {
            setTimeout(function(){
				modal.style.display = "block";
                player.resetPlayer();
            }, 500);
		};
		
		// When the user clicks on close button, close the modal
			buttons.onclick = function() {
			modal.style.display = "none";
		};
	};
};
	
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
	const enemy1 = new Enemy(-100, 50);
	const enemy2 = new Enemy(-150, 110); 
	const enemy3 = new Enemy(-200, 170);
	const enemy4 = new Enemy(-250, 230);
	const allEnemies = [enemy1, enemy2, enemy3, enemy4];
	const player = new Player(200, 350);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
