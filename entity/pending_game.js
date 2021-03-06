var colorIndices = {
  "white": 0,
  "black": 1,
  "blue": 2,
  "green": 3
};

var PendingGame = function() {
  this.players = {};
  this.state = "empty";
  this.mapName = "";
  this.colors = [{
    colorName: "white",
    available: true
  }, {
    colorName: "black",
    available: true
  }, {
    colorName: "blue",
    available: true
  }, {
    colorName: "green",
    available: true
  }];
};

PendingGame.prototype = {
  getPlayerIds: function() {
    return Object.keys(this.players);
  },

  getNumPlayers: function() {
    return Object.keys(this.players).length;
  },

  removePlayer: function(id) {
    if (this.players[id]) {
      if (this.colors[colorIndices[this.players[id].color]]) {
        this.colors[colorIndices[this.players[id].color]].available = true;
      }
      delete this.players[id];
    }
  },

  addPlayer: function(id) {
    this.players[id] = {
      color: this.claimFirstAvailableColor()
    };
  },

  claimFirstAvailableColor: function() {
    for (var i = 0; i < this.colors.length; i++) {
      var color = this.colors[i];
      if (color.available) {
        color.available = false;
        return color.colorName;
      }
    }
  }
};

module.exports = PendingGame;
