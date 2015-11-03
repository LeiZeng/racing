// var gameInstance = require('../../entity/game')
var Login = function () {};

Login.prototype = {
    preload: function () {},
    create: function () {
      game.add.sprite(0, 0, 'background_s');
      this.avatarButton = game.add.text(
        game.world.centerX,
        game.world.centerY,
        'choose an avatar',
        {
          font: "65px Arial",
          fill: "#ffff00",
          align: "center"
        });
      this.button = game.add.text(
        game.world.centerX,
        game.world.centerY + 200,
        "Join Game!",
        {
          font: "65px Arial",
          fill: "#ffff00",
          align: "center"
        });

      this.avatarButton.anchor.set(0.5);

      this.button.anchor.set(0.5);
      this.button.inputEnabled = true;
      this.button.events.onInputDown.add(this.onLogin, this);
      this.button.events.onInputOver.add(this.onLoginButtonHover, this);
      this.button.events.onInputOut.add(this.onLoginButtonBlur, this);
    },
    onLoginButtonHover: function () {
      this.button.fill = '#00ff30';
    },
    onLoginButtonBlur: function () {
      this.button.fill = '#ffff00';
    },
    onLogin: function () {
      socket.on('login success', function (players) {
        window.player.players = players;
        game.state.start('Lobby');
      })
      socket.emit("user login", {
        id: socket.id,
        name: 'NewUser' + new Date().getTime()
      });
    }
};

module.exports = Login;
