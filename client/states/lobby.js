var Lobby = function() {};

module.exports = Lobby;

Lobby.prototype = {
  init: function() {},

  create: function() {
    game.add.sprite(0, 0, 'background');
  },

  update: function() {},

  joinGameAction: function(gameId) {
    socket.removeAllListeners();
    game.state.start("PendingGame", true, false, null, gameId);
  }
};
