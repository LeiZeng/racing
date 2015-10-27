var Login = function () {
};

module.exports = Login;

Login.prototype = {

    preload: function () {
    },

    create: function () {
      game.add.sprite(0, 0, 'background');
      var button = game.add.sprite(0, 0, 'button');

      button.on('click', function () {
        socket.emit("user login", name);
        game.state.start('Lobby')
      })
    }
};
