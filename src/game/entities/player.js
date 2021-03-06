var Bomb = require("./bomb");

var DEFAULT_PLAYER_SPEED = 250;
var PLAYER_SPEED_POWERUP_INCREMENT = 25;

var Player = function (x, y, id, color) {
    Phaser.Sprite.call(this, game, x, y, "bomberman_" + color);

    this.spawnPoint = {x: x, y: y};
    this.id = id;
    this.facing = "down";
    this.bombButtonJustPressed = false;
    this.speed = DEFAULT_PLAYER_SPEED;

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.anchor.setTo(0.1, 0.6);
    this.body.setSize(20, 19, 5, 16);

    this.animations.add('up', [0, 1, 2, 3, 4, 5, 6, 7], 15, true);
    this.animations.add('down', [8, 9, 10, 11, 12, 13, 14, 15], 15, true);
    this.animations.add('right', [16, 17, 18, 19, 20, 21, 22, 23], 15, true);
    this.animations.add('left', [24, 25, 26, 27, 28, 29, 30, 31], 15, true);

    game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.handleInput = function () {
    this.handleMotionInput();
    this.handleBombInput();
};

Player.prototype.handleMotionInput = function () {
    var moving = true;

    game.physics.arcade.collide(this, level.blockLayer);
    game.physics.arcade.collide(this, level.bombs);

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.body.velocity.y = 0;
        this.body.velocity.x = -this.speed;
        this.facing = "left";
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.body.velocity.y = 0;
        this.body.velocity.x = this.speed;
        this.facing = "right";
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.body.velocity.x = 0;
        this.body.velocity.y = -this.speed;
        this.facing = "up";
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        this.body.velocity.x = 0;
        this.body.velocity.y = this.speed;
        this.facing = "down";
    } else {
        moving = false;
        this.freeze();
    }

    if (moving) {
        this.animations.play(this.facing);
        socket.emit("move player", {x: this.position.x, y: this.position.y, facing: this.facing});
    }
};

Player.prototype.handleBombInput = function () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !game.physics.arcade.overlap(this, level.bombs) && !this.bombButtonJustPressed) {
        this.bombButtonJustPressed = true;
        socket.emit("place bomb", {x: this.body.position.x, y: this.body.position.y, id: game.time.now});
    } else if (!game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.bombButtonJustPressed) {
        this.bombButtonJustPressed = false;
    }
};

Player.prototype.freeze = function () {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.animations.stop();
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