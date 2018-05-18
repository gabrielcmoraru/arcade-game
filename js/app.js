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
	this.totalEnemies = 3;
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
		if (this.x < 500) {
			this.x += this.speed * dt;
		} else {
			this.x =- game.randomNumber(50,600);
		}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
	this.width = Resources.get(enemy.sprite).naturalWidth;
	this.height = Resources.get(enemy.sprite).naturalHeight;
};

const Player = function() {
	this.spriteChar = 'char-princess-girl';
	this.sprite = 'images/' + this.spriteChar + '.png';
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
				game.levelUp();
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

const Gem = function() {
	this.live = true;
	this.gems = [
		['images/gemorange.png'],
		['images/gemblue.png'],
		['images/gemgreen.png']
	];
	this.sprite = this.gems[Math.floor(Math.random() * 3)];
	this.x = Math.floor(Math.random() * (300 - 50 + 1) + 50);
	this.y = Math.floor(Math.random() * 450);
}

Gem.prototype.randomizeGem = function(){
	this.sprite = this.gems[Math.floor(Math.random() * 3)];
	this.x = Math.floor(Math.random() * (300 - 50 + 1) + 50);
	this.y = Math.floor(Math.random() * 450);
};


Gem.prototype.render = function(){
	if (gem.live) {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
	}
	this.width = 80;
	this.height = 160;
};

Gem.prototype.update = function(){
		//Gem hit detection
	if (this.x < player.x + player.width / 2 &&
			this.x + this.width / 2 > player.x &&
			this.y < player.y + player.height / 3 &&
			this.y + this.height / 3 > player.y) {
			gem.pickup();
		}
};

Gem.prototype.pickup = function() {
	switch (gem.sprite) {
		//Orange
		case (gem.gems[0]):
		if (gem.live) {
					let curentPlayer = player.sprite;
					gem.live = false;
					game.score +=500;
					enemy.live = false;
					player.sprite = 'images/star.png';
					setTimeout(function() {
						enemy.live = true;
						player.sprite = curentPlayer;
						gem.live = true;
						}, 6000);
					gem.randomizeGem();
				}
		break;
		//Blue
		case gem.gems[1]:
		if (gem.live) {
					gem.live = false;
					game.playerLives ++;
					setTimeout(function() {
						gem.live = true;
						}, 2000);
					gem.randomizeGem();
				}
		break;
		//Green
		case gem.gems[2]:
		if (gem.live) {
					gem.live = false;
					game.score +=200;
					player.movementKey.speed = game.randomNumber(3, 8);
					setTimeout(function() {
						gem.live = true;
						}, 4000);
					gem.randomizeGem();
				}
		break;
	}
}

//Game object
const Game = function() {
	this.paused = false;
	this.level = 1;
	this.playerLives = 5;
	this.playerLivesIcon = 'images/heart.png';
	this.score = 0;
	this.baseScore = 150;
}

Game.prototype.randomNumber = function(min, max){
	return Math.floor(Math.random() * (max - min) + min);
};

//Game board method
Game.prototype.board = function(){
	//Update Level
	ctx.canvas.style.letterSpacing = '2px';
	ctx.fillStyle = 'gold';
	ctx.storkeStyle = 'black';
	ctx.lineWidth = 5;
	ctx.font = '18pt tahoma';
	ctx.strokeText(`Level ${game.level}`, 5, 40);
	ctx.fillText(`Level ${game.level}`, 5, 40);
	//Update Score
	ctx.font = '18pt tahoma';
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'green';
	ctx.strokeText('Score:' + game.score, (ctx.canvas.width/2) - (ctx.measureText('Score:' + game.score).width / 2), 40 );
	//Update Lives
	ctx.drawImage(Resources.get(game.playerLivesIcon), 450, -8, 50, 70);
	ctx.font = '14pt tahoma';
	ctx.lineWidth = 2;
	ctx.fillStyle = 'blue';
	ctx.strokeStyle = 'black';
	ctx.strokeText(`${game.playerLives} x `, 410 - (ctx.measureText(game.playerLives).width/2 ), 40);
	ctx.fillText(`${game.playerLives} x`, 410 - (ctx.measureText(game.playerLives).width/2 ), 40);
};

Game.prototype.dataScore = function() {
	let storedScore = JSON.parse(localStorage.getItem('storedScore')) || [];
	localStorage.setItem('storedScore', JSON.stringify(this.score));
	// storedScore.push(game.score);
	// storedScore.splice(0, storedScore.length - 5);
};

//Game level up method
Game.prototype.levelUp = function() {
	if (this.level % 3 == 0) {
		enemy.speed += 220;
		this.enemyGenerator();
	}
	if (this.level % 10 == 0) {
		enemy.totalEnemies++;
		this.baseScore += 100;
	}
	player.reset();
	gem.randomizeGem();
	this.score += this.baseScore;
	this.level ++;
	this.dataScore();

};

//Enemy generator
Game.prototype.enemyGenerator = function() {
	allEnemies.splice(0, allEnemies.length);
	let row = [65,150,235];
	for (let x = 0; x < enemy.totalEnemies; x++) {
		let eY = row[Math.floor(Math.random() * 3)];
		let eX = (Math.floor(Math.random() * 500) - 300);
		allEnemies.push(new Enemy(eX, eY, enemy.speed))
	}
};

//Game over message and initialisation
Game.prototype.gameOver = function() {
	if (game.playerLives < 1) {
		player.live = false;
		enemy.live = false;
		ctx.rect(0,250,510,250);
		ctx.fillStyle = 'black';
		ctx.fill();
		ctx.font = '35px Arial';
		ctx.fillStyle = 'white';
		ctx.fillText('GAME OVER',(ctx.canvas.width/2)-ctx.measureText('GAME OVER').width/2,320);
		ctx.fillText('Final score:' + game.score, (ctx.canvas.width/2)-ctx.measureText('Final score:' + game.score).width/2,370);
		ctx.font = '25px Arial red';
		ctx.fillText('Press ENTER to Play Again',(ctx.canvas.width/2)-ctx.measureText('Press ENTER to Play Again').width/2,420)
	}
}


//Game pause method
Game.prototype.togglePause = function()
{
	!this.paused ? this.paused = true : this.paused = false;
	ctx.font = "44pt Arial";
	ctx.fillStyle = "Black";
	ctx.fillText("GAME PAUSED",20,400);
}

//Game got hit method
Game.prototype.gotHit = function(){
	player.live = false;
	enemy.live = false;
	this.score -= 50;
	this.playerLives --;
	if (game.playerLives > 0){
		setTimeout(function() {
		player.reset();
		this.enemyGenerator();
		switch (player.spriteChar) {
			case 'char-princess-girl':
				player.spriteChar = 'char-pink-girl';
				break;
			case 'char-pink-girl':
				player.spriteChar = 'char-boy';
				break;
			case 'char-boy':
				player.spriteChar = 'char-horn-girl';
				break;
			case 'char-horn-girl':
				player.spriteChar = 'char-cat-girl';
				break;
			default:
				player.spriteChar = 'char-pink-girl';
				break;
		}
		player.sprite = 'images/' + player.spriteChar + '.png';
		player.live = true;
		enemy.live = true;
		}.bind(this), 1000);}
};

let game = new Game();
let player = new Player();
let gem = new Gem();
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let enemy = new Enemy();
let allEnemies = [];
game.enemyGenerator();
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

document.addEventListener('keydown', function (e) {
var key = e.keyCode;
if (key === 13)// space key
{
		location.reload();
}
});
