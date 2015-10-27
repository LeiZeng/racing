window.game = new Phaser.Game(875, 525, Phaser.AUTO, 'stage');
window.player = null;
window.socket = null;
window.level = null;

startGame();

function startGame() {
  socket = io();

  game.state.add("Boot", require("./states/boot"));
  game.state.add("Preloader", require("./states/preloader"));
  game.state.add("Lobby", require("./states/lobby"));

  game.state.start('Boot');
};
