var Lobby = function() {};

module.exports = Lobby;

Lobby.prototype = {
  init: function() {},

  create: function() {
    window.player = window.player || {};
    window.player.players = [
      { id: 1,
        name: "xiaoHong",
        isPlaying: true,
        photo: "bomberman_head_white"
      },
      { id: 2,
        name: "xiaoLan",
        isPlaying: false,
        photo: "bomberman_head_red"
      },
      { id: 3,
        name: "Lily",
        isPlaying: true,
        photo: "bomberman_head_green"
      },
      { id: 4,
        name: "Lucy",
        isPlaying: false,
        photo: "bomberman_head_purple"
      }
    ];

    game.add.sprite(0, 0, 'background');
    var firstLine = game.add.sprite(0, 10, 'line');
    var secondLine = game.add.sprite(0, 135, 'line');
    var thirdLine = game.add.sprite(0, 260, 'line');
    var forthLine = game.add.sprite(0, 385, 'line');
    firstLine.height = 125;
    secondLine.height = 125;
    thirdLine.height = 125;
    forthLine.height = 125;

    var activeIndex = 0;
    window.player.players.forEach(function(player, index, players){
      if (index < 4 && player.isPlaying) {
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(0, 10 + activeIndex * 125, player.name, style);
        game.add.sprite(0, 40 + activeIndex * 125, player.photo);
        activeIndex ++;
      };
    });

    socket.on('New player join', function(players) {

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
