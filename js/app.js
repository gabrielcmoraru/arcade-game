// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.floor(Math.random()*150);
    this.y = Math.floor(Math.random()*220);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

     if (this.x < 505) {
        this.x += (150 * dt);
    }
    else {this.x = -90;};

     if (player.y < this.y + 50 && this.y < player.y + 50 &&
    	player.x < this.x + 50 && this.x < player.x + 50) {
    	player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function() {
	this.sprite = 'images/star.png'
	this.x = 200;
	this.y = 420;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//TO DO : CHANGE THIS TO SWITCH TOMMORRRROOWWWWW!!!!
Player.prototype.update = function() {
	let x = 50;
	if (player.x < -20) {
		this.x += 450;
	}
	if (player.x > 400) {
		this.x = -1;
	}
	if (player.y > 425) {
		this.y = 370;
	}
	else if (player.y < -30) {
		this.reset();
	}

}

Player.prototype.handleInput = function(e) {
	if (e == 'right') {
		this.x += 85;
	}
	if (e  == 'left') {
		this.x -= 85;
	}
	if (e == 'down') {
		this.y += 85;
	}
	if (e  == 'up') {
		this.y -= 85;
	}
}

Player.prototype.reset = function(e) {
	this.x = 200;
	this.y = 420;
};

let player = new Player();
let enemy = new Enemy();
let enemy2 = new Enemy();

let allEnemies = [enemy, enemy2];
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
