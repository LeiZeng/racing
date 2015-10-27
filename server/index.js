var fs = require('fs');
var path = require('path');
var express = require("express");

var app = express();
var server = require("http").Server(app);
// var login = require('./login');
// var lobby = require('./lobby');
// var gaming = require('./gaming');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(req, res) {
  res.sendfile(path.resolve(__dirname, '../index.html'));
});

socket = require("socket.io").listen(server);

var games = {};
games.maxPlayer = 4;

var updateInterval = 200;
app.use(express.static("client"));
server.listen(process.env.PORT || 3000);

init();

function init() {
  setEventHandlers();
  setInterval(broadcastingLoop, updateInterval);
};

function setEventHandlers() {
  socket.sockets.on("connection", function(client) {
    console.log("New player has connected: " + client.id);
    // client.on('user login', function (userName) {
    //   if (!game.players[client.id]) {
    //     game.players[client.id] = {}
    //   }
    //   game.players[client.id][name] = userName;
    // })

  //mocked data which should be got from login
    games.players = [
      { id: 1,
        name: "xiaoHong",
        isPlaying: true
      }, { id: 2,
        name: "xiaoLan",
        isPlaying: true
      }, { id: 3,
        name: "Lily",
        isPlaying: true
      }, { id: 4,
        name: "Lucy",
        isPlaying: true
      }
    ];

    client.on('start racing', function() {
      
    })
  });
};

function broadcastingLoop() {
  games.players && games.players
  .filter(function (player) {
    return player.alive
  })
  .forEach(function(player) {
    socket.sockets.in(games.id).emit("player position", {
      id: player.id,
      x: player.x,
      y: player.y,
      facing: player.facing,
      timestamp: (+new Date())
    });
  })
};
