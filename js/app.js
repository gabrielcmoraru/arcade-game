// Enemie Object our player must avoid
var Enemy = function(x, y, speed) {
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
	//get the 'enemy sprite' width and height
	this.width = Resources.get(enemy.sprite).naturalWidth;
	this.height = Resources.get(enemy.sprite).naturalHeight;
};

// Player Object
const Player = function() {
	this.spriteChar = 'char-princess-girl';
	this.sprite = 'images/' + this.spriteChar + '.png';
	this.live = true;
	this.x = 200;
	this.y = 400;
};

// Draw player on the screen
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
	//get the 'player sprite' width and height
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

// Movement logic
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

// Conditions to enable movement
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

// Conditions to disable input
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

// Respawn player on the bottom of the screen
Player.prototype.reset = function(e) {
	this.x = 200;
	this.y = 400;
};

// Gem Object
// On run selects a random gem from the 3 available to be used as a sprite
const Gem = function() {
	this.live = true;
	this.gems = [
		['images/gemorange.png'],
		['images/gemblue.png'],
		['images/gemgreen.png']
	];
	this.sprite = this.gems[game.randomNumber(0, 3)];
	this.x = game.randomNumber(0, 450);
	this.y = game.randomNumber(0, 300);
}

// Random select a gem and random assign coordinates
Gem.prototype.randomizeGem = function(){
	this.sprite = this.gems[game.randomNumber(0, 3)];
	this.x = game.randomNumber(0, 450);
	this.y = game.randomNumber(0, 350);
};

// Render gem on screen
Gem.prototype.render = function(){
	if (gem.live) {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
	}
	// Randomise the gem width and height to give it a silly animation
 	this.width = game.randomNumber(86, 90);
	this.height = game.randomNumber(146, 150);;
};

// Logic for gem collision
Gem.prototype.update = function(){
		//Gem hit detection
	if (this.x < player.x + player.width / 2 &&
			this.x + this.width / 2 > player.x &&
			this.y < player.y + player.height / 3 &&
			this.y + this.height / 3 > player.y) {
			gem.pickup();
		}
};

// Gem collision action
// Uppon collision gem's are disabled and enabled after a random amount of time 1-10 sec
// Orange gem stores the curent player sprite than changes player to a star sprite, freezes all enemyes for a random amout of time 1-10 sec and gives 500 score points then reverts to the original sprite
// Blue gem gives player a extra life
// Green gem modifies player speed(increase or decrease) for a random amount of time 1-10 sec
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
							}, game.randomNumber(1000, 10000));
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
							}, game.randomNumber(1000, 10000));
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
							player.movementKey.speed = 5;
							gem.live = true;
							}, game.randomNumber(1000, 10000));
						gem.randomizeGem();
					}
			break;
	}
}

// Game object
const Game = function() {
	this.paused = false;
	this.level = 1;
	this.playerLives = 5;
	this.playerLivesIcon = 'images/heart.png';
	this.score = 0;
	this.baseScore = 150;
}

// Random number generator returns a number between two variables
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

// Game level up method
Game.prototype.levelUp = function() {
	// Increase score every 3 levels
	if (this.level % 3 === 0) {
		this.baseScore += 100;
	}
	// Increase total number of enemye's every 10 levels
	if (this.level % 10 === 0) {
		enemy.totalEnemies++;
	}
	player.reset();
	gem.randomizeGem();
	this.score += this.baseScore;
	this.level ++;
	this.enemyGenerator();
};

// Enemy generator
// Removes all enemy uppon execution and generates new one's with random coordinates
Game.prototype.enemyGenerator = function() {
	allEnemies.splice(0, allEnemies.length);
	let row = [65,150,235];
	for (let x = 0; x < enemy.totalEnemies; x++) {
		let eY = row[game.randomNumber(0, 3)];
		let eX = (game.randomNumber(0, 500) - game.randomNumber(300, 500));
		allEnemies.push(new Enemy(eX, eY))
	}
};

// Game Over message and initialisation
// Uppon reaching 0 lives games is stopped
Game.prototype.gameOver = function() {
	if (game.playerLives == 0) {
		player.live = false;
		enemy.live = false;
		gem.live = false;
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


// Game pause method
Game.prototype.togglePause = function()
{
	!this.paused ? this.paused = true : this.paused = false;
	ctx.font = "44pt Arial";
	ctx.fillStyle = "Black";
	ctx.fillText("GAME PAUSED",20,400);
}

// Game got hit method
// - penalty for getting hit
// - changes player sprite with the next one and the next one in a given order
Game.prototype.gotHit = function(){
	player.live = false;
	enemy.live = false;
	this.score -= 500;
	this.playerLives --;
	if (game.playerLives > 0){
		setTimeout(function() {
		player.reset();
		this.enemyGenerator();
		gem.randomizeGem();
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
let enemy = new Enemy();
let allEnemies = [];

//Keyup and Keydown event listener for movement
document.addEventListener('keyup', function(e) {
		player.disableInput(player.movementKey[e.keyCode]);
}, false);

document.addEventListener('keydown', function(e) {
		player.enableInput(player.movementKey[e.keyCode]);
}, false);

// Event listeners for pause
document.addEventListener('keydown', function (e) {
var key = e.keyCode;
if (key === 32)// space key
{
		game.togglePause();
}
});

// Event listeners for game reset(page reload)
document.addEventListener('keydown', function (e) {
var key = e.keyCode;
if (key === 13)// enter key
{
		location.reload();
}
});
