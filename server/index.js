var fs = require('fs');
var path = require('path');
var express = require("express");

var app = express();
var server = require("http").Server(app);
var game = require('../entity/game');
// var login = require('./login');
// var lobby = require('./lobby');
// var gaming = require('./gaming');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(req, res) {
  res.sendfile(path.resolve(__dirname, '../index.html'));
});

var io = require("socket.io").listen(server);

var updateInterval = 200;
var games = {};
games.maxPlayer = 4;

app.use(express.static("client"));
server.listen(process.env.PORT || 3000);

init();

function init() {
  setEventHandlers();
  setInterval(broadcastingLoop, updateInterval);
};

function setEventHandlers() {
  io.sockets.on("connection", function(socket) {
    console.log("New player has connected: " + socket.id);
    socket.on('disconnect', removePlayer);
    socket.on('user login', addPlayer);

    socket.on('start racing', function() {

    })
  });
};

function addPlayer(player) {
  game.addPlayer(player);
  this.emit('login success', game.getPlayers());
}

function removePlayer() {
  game.removePlayer({id: this.id});
  io.sockets.emit('login out', this.id);
}

function broadcastingLoop() {
  games.players && games.players
  .filter(function (player) {
    return player.alive
  })
  .forEach(function(player) {
    io.sockets.in(games.id).emit("player position", {
      id: player.id,
      x: player.x,
      y: player.y,
      facing: player.facing,
      timestamp: (+new Date())
    });
  })
};
