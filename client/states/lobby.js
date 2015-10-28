var Lobby = function() {};

module.exports = Lobby;

var lobby = {};
lobby.players = [
  { id: 1,
    name: "xiaoHong",
    isPlaying: true,
    photo: "bomberman_head_white"
  }, 
  { id: 2,
    name: "xiaoLan",
    isPlaying: true,
    photo: "bomberman_head_red"
  }, 
  { id: 3,
    name: "Lily",
    isPlaying: true,
    photo: "bomberman_head_green"
  }
];

Lobby.prototype = {
  init: function() {},

  create: function() {
    game.add.sprite(0, 0, 'background');
    var firstLine = game.add.sprite(0, 10, 'line');
    var secondLine = game.add.sprite(0, 135, 'line');
    var thirdLine = game.add.sprite(0, 260, 'line');
    var forthLine = game.add.sprite(0, 385, 'line');
    firstLine.height = 125;
    secondLine.height = 125;
    thirdLine.height = 125;
    forthLine.height = 125;

    lobby.players.forEach(function(player, index, players){
      if (index < 4) {
        game.add.sprite(0, 40 + index * 120, player.photo);       
      };
    });

    socket.on('New player join', function() {

    });
  },

  update: function() {},

  joinGameAction: function(gameId) {
    socket.removeAllListeners();
    socket.emit('Start');
    game.state.start("gaming");
    game.state.start("PendingGame", true, false, null, gameId);
  }
};
