// Enemies our player must avoid
var Enemy = function(x, y, speed) {
		// Variables applied to each of our instances go here,
		// we've provided one for you to get started

		// The image/sprite for our enemies, this uses
		// a helper we've provided to easily load images
		this.sprite = 'images/enemy-bug.png';
		this.live = true;
		this.x = x;
		this.y = y;
		this.speed = 150;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	//Collision logic
		if (this.x < player.x + player.width / 2 &&
			this.x + this.width / 2 > player.x &&
			this.y < player.y + player.height / 3 &&
			this.y + this.height / 3 > player.y)  {
			game.gotHit();
		}
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		let minSpeed = 50;
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
	this.live = true;
	this.x = 200;
	this.y = 400;
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
	this.width = Resources.get(player.sprite).naturalWidth;
	this.height = Resources.get(player.sprite).naturalHeight;
};

//Movement keys object
Player.prototype.movementKey = {
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
	if (player.movementKey.rightPressed && this.x + this.width < 500) {
			this.x += player.movementKey.speed;
	}
	if (player.movementKey.leftPressed && this.x > 0) {
			this.x -= player.movementKey.speed;
	}
	if (player.movementKey.upPressed) {
			this.y -= player.movementKey.speed;
			if ( this.y < -30) {
				game.gotHit();
			}
	}
	else if(player.movementKey.downPressed && this.y < 440) {
			this.y += player.movementKey.speed;
	}
}

//Conditions to enable movement
Player.prototype.enableInput = function(e) {
	if (e == 'right') {
			player.movementKey.rightPressed = true;
	}
	if (e == 'left') {
			player.movementKey.leftPressed = true;
	}
	if (e == 'up') {
			player.movementKey.upPressed = true;
	}
	else if(e == 'down') {
			player.movementKey.downPressed = true;
	}
}

//Conditions to disable input
Player.prototype.disableInput = function(e) {
	if (e == 'right') {
			player.movementKey.rightPressed = false;
	}
	if (e == 'left') {
			player.movementKey.leftPressed = false;
	}
	if (e == 'up') {
			player.movementKey.upPressed = false;
	}
	else if (e == 'down') {
			player.movementKey.downPressed = false;
	}
}

Player.prototype.reset = function(e) {
		this.x = 200;
		this.y = 400;
};

//Game object
const Game = function() {
	this.paused = false;
	this.level = 1;
	this.playerLives = 8;
	this.playerLivesIcon = 'images/heart.png';
	this.score = 110;
}

//Game board method
Game.prototype.board = function(){
	//Update Level
	ctx.canvas.style.letterSpacing = '2px';
	ctx.fillStyle = 'orange';
	ctx.storkeStyle = 'black';
	ctx.lineWidth = 5;
	ctx.font = '20pt tahoma';
  ctx.strokeText(`Level ${game.level}`, 5, 40);
  ctx.fillText(`Level ${game.level}`, 5, 40);
  //Update Score
  ctx.font = '20pt tahoma';
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'green';
  ctx.strokeText(`Score:${game.score}`, 165, 40 );
  //Update Live
  ctx.drawImage(Resources.get(game.playerLivesIcon), 450, -8, 50, 70);
  ctx.font = '30pt tahoma';
  ctx.lineWidth = 2;
  ctx.fillStyle = 'blue';
  ctx.strokeStyle = 'black';
  ctx.strokeText(`${game.playerLives}`, 420, 45);
  ctx.fillText(`${game.playerLives}`, 420, 45);
};

//

//Pause method
Game.prototype.togglePause = function()
{
	!this.paused ? this.paused = true : this.paused = false;
}

//Animation
Game.prototype.gotHit = function(){
	player.live = false;
	enemy.live = false;
	player.sprite = 'images/ghost.png';
	setTimeout(function() {
	player.reset();
	player.sprite = 'images/char-cat-girl.png';
	player.live = true;
	enemy.live = true;
	}.bind(this), 2000);
//TO BE CONTINUED
// var imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
//   var data = imageData.data;
//    var colorade = function() {
//     for (var i = 0; i < data.length; i += 4) {
//       data[i]     = data[i] ; // red
//       data[i + 1] = data[i+1] + 1; // green
//       data[i + 2] = data[i+2] + 2; // blue
//       data[i + 3] = data[i+3] + 3; // alpha
//     }
//     ctx.putImageData(imageData, 0, 0);
//   };
//   colorade();

//   ctx.color = 'white';
// 	ctx.font = '65px serif';
//   this.text = 'Let\'s try this again';
//   textWidth = ctx.measureText(this.text).width;
//   ctx.fillText(this.text , (ctx.canvas.width/2) - (textWidth / 2), ctx.canvas.height/2);
};

let game = new Game();
let player = new Player();
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let enemy = new Enemy(0, 65, 10);
let enemy2 = new Enemy(240, 150, 5);
let enemy3 = new Enemy(-750, 230, 15);
let enemy4 = new Enemy(-1540, 230, 24);
let allEnemies = [enemy, enemy2, enemy3, enemy4];
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

//Keyup and Keydown event listener
document.addEventListener('keyup', function(e) {
		player.disableInput(player.movementKey[e.keyCode]);
}, false);

document.addEventListener('keydown', function(e) {
		player.enableInput(player.movementKey[e.keyCode]);
}, false);
document.addEventListener('keydown', function (e) {
var key = e.keyCode;
if (key === 32)// space key
{
    game.togglePause();
}
});