// Enemies our player must avoid
var Enemy = function(x, y, speed) {
		// Variables applied to each of our instances go here,
		// we've provided one for you to get started

		// The image/sprite for our enemies, this uses
		// a helper we've provided to easily load images
		this.sprite = 'images/enemy-bug.png';
		this.x = x;
		this.y = y;
		this.speed = 150;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
		if (this.x < player.x + 50 &&
			this.x + 50 > player.x &&
			this.y < player.y + 50 &&
			this.y + 50 > player.y)  {
			player.reset();
		}
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		let minSpeed = 100;
		if (this.x < 500) {
			this.x += this.speed * dt;
		} else {
			this.x =- Math.floor(Math.random() * 300);
			this.speed = Math.floor(Math.random() * 300) + minSpeed;
		}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
	this.width = Resources.get(enemy.sprite).naturalWidth;
	this.height = Resources.get(enemy.sprite).naturalHeight;
};

const Player = function() {
	this.sprite = 'images/char-princess-girl.png';
	this.x = 200;
	this.y = 400;
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
	this.width = Resources.get(player.sprite).naturalWidth;
	this.height = Resources.get(player.sprite).naturalHeight;
};

//Movement keys object
let movementKey = {
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down',
	rightPressed : false,
	leftPressed : false,
	upPressed : false,
	downPressed : false,
	speed : 5
}

//Conditions for movement
Player.prototype.update = function() {
	if(movementKey.rightPressed && this.x + this.width < 500) {
			this.x += movementKey.speed;
	}
	if(movementKey.leftPressed && this.x > 0) {
			this.x -= movementKey.speed;
	}
	if(movementKey.upPressed) {
			this.y -= movementKey.speed;
			if ( this.y < -60) {
				player.reset();
			}
	}
	else if(movementKey.downPressed && this.y < 440) {
			this.y += movementKey.speed;
	}
}

//Conditions to enable movement
Player.prototype.enableInput = function(e) {
	if(e == 'right') {
			movementKey.rightPressed = true;
	}
	if(e == 'left') {
			movementKey.leftPressed = true;
	}
	if(e == 'up') {
			movementKey.upPressed = true;
	}
	else if(e == 'down') {
			movementKey.downPressed = true;
	}
}

//Conditions to disable input
Player.prototype.disableInput = function(e) {
	if(e == 'right') {
			movementKey.rightPressed = false;
	}
	if(e == 'left') {
			movementKey.leftPressed = false;
	}
	if(e == 'up') {
			movementKey.upPressed = false;
	}
	else if(e == 'down') {
			movementKey.downPressed = false;
	}
}

Player.prototype.reset = function(e) {
	this.x = 200;
	this.y = 400;
};

let player = new Player();
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let enemy = new Enemy(0, 60, 10);
let enemy2 = new Enemy(240, 145, 5);
let enemy3 = new Enemy(-750, 225, 15);
let enemy4 = new Enemy(-1540, 225, 24);
let allEnemies = [enemy, enemy2, enemy3, enemy4];
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

//Keyup and Keydown event listener
document.addEventListener('keyup', function(e) {
		player.disableInput(movementKey[e.keyCode]);
}, false);

document.addEventListener('keydown', function(e) {
		player.enableInput(movementKey[e.keyCode]);
}, false);
