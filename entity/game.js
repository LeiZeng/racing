var _ = require('lodash');
var gameStatus = ['lobby', 'gaming', 'celebreting']
var MAX_PLAYER = 4;
var game = {};

game.players = [];
game.status = 'lobby';

game.hasPlayer = function (id) {
  return _.find(game.players, function (player) {
    return player.id === id
  })
}
game.addPlayer = function (player) {
  if (!game.hasPlayer(player)) {
    game.players.push(player)
  }
}
game.removePlayer = function (player) {
  if (game.hasPlayer(player)) {
    game.player = _.filter(game.player, function (player) {
      return game.player.id !== player.id
    })
  }
}
game.getPlayers = function () {
  return game.players
}
module.exports = game;
