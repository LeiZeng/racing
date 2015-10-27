var Lobby = function() {};

module.exports = Lobby;

Lobby.prototype = {
  init: function() {},

  create: function() {
    game.add.sprite(0, 0, 'background');
    game.add.sprite(0, 10, 'line');
    game.add.sprite(0, 135, 'line');
    game.add.sprite(0, 260, 'line');
    game.add.sprite(0, 385, 'line');
  },

  update: function() {},

  joinGameAction: function(gameId) {
    socket.removeAllListeners();
    game.state.start("PendingGame", true, false, null, gameId);
  }
};
