window.game = new Phaser.Game(875, 525, Phaser.AUTO, 'stage');
window.player = {};
window.socket = null;
window.level = null;

window.RACER_ICON_WIDTH = 120

startGame();

function startGame() {
  socket = io();

  game.state.add("Boot", require("./states/boot"));
  game.state.add("Preloader", require("./states/preloader"));
  game.state.add("Login", require("./states/login"));
  game.state.add("Lobby", require("./states/lobby"));
  game.state.add("Gaming", require("./states/gaming"));

  game.state.start('Preloader');
};
