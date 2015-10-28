
var DEFAULT_PLAYER_SPEED = 150;
var PLAYER_SPEED_POWERUP_INCREMENT = 5;

var Player = function (x, y, id, color) {
  Phaser.Sprite.call(this, game, x, y, "bomberman_" + color);

  this.spawnPoint = {x: x, y: y};
  this.id = id;
  this.facing = "right";
  this.spaceJustPressed = false;
  this.startRaceAnimate = false
  //this.bombButtonJustPressed = false;
  this.speed = DEFAULT_PLAYER_SPEED;

  game.physics.enable(this, Phaser.Physics.ARCADE);

  this.anchor.setTo(0.1, 0.6);
  this.body.setSize(20, 19, 5, 16);

  //this.animations.add('up', [0, 1, 2, 3, 4, 5, 6, 7], 15, true);
  //this.animations.add('down', [8, 9, 10, 11, 12, 13, 14, 15], 15, true);
  this.animations.add('right', [16, 17, 18, 19, 20, 21, 22, 23], 15, true);
  //this.animations.add('left', [24, 25, 26, 27, 28, 29, 30, 31], 15, true);

  game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.handleInput = function () {
  this.handleMotionInput();
  //this.handleBombInput();
};


/**
 * handle player input action
 */
Player.prototype.handleMotionInput = function () {
  var moving

  game.physics.arcade.collide(this, level.blockLayer);
  game.physics.arcade.collide(this, level.bombs);

  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !this.spaceJustPressed) {
    moving = true
    this.body.velocity.y = 0;
    this.body.velocity.x = this.speed;
    this.facing = "right";
    this.spaceJustPressed = true
  } else if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.spaceJustPressed){
    moving = false;
    this.freeze();
  } else if(!game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.spaceJustPressed){
    this.spaceJustPressed = false;
  }

  if (moving) {
    this.animations.play(this.facing);
    socket.emit("move player", {x: this.position.x, y: this.position.y, facing: this.facing});
  }
};

/*Player.prototype.handleBombInput = function () {
  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !game.physics.arcade.overlap(this, level.bombs) && !this.bombButtonJustPressed) {
    this.bombButtonJustPressed = true;
    socket.emit("place bomb", {x: this.body.position.x, y: this.body.position.y, id: game.time.now});
  } else if (!game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.bombButtonJustPressed) {
    this.bombButtonJustPressed = false;
  }
};*/

Player.prototype.freeze = function () {
  var self = this;
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;
    //self.animations.stop();

};

Player.prototype.applySpeedPowerup = function () {
  this.speed += PLAYER_SPEED_POWERUP_INCREMENT;
};

Player.prototype.reset = function () {
  this.x = this.spawnPoint.x;
  this.y = this.spawnPoint.y;
  this.frame = 0;
  this.facing = "down";
  this.bombButtonJustPressed = false;
  this.speed = DEFAULT_PLAYER_SPEED;

  if (!this.alive) {
    this.revive();
  }
};

module.exports = Player;