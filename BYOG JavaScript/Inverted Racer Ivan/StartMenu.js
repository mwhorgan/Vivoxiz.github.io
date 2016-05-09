invertedRacer.StartMenu = function (game) {
    this.startBG;
    this.startText;
    this.startGame;
}

invertedRacer.StartMenu.prototype = {
	
	create: function() {
        this.startBG = this.add.image(0, 0, 'titlescreen');

        this.startText = this.add.image(110, this.world.centerY, 'startGameText');
        this.startText.inputEnabled = true;
        this.startText.events.onInputDown.addOnce(this.startGame, this);
    },
    
    startGame: function (pointer) {
        this.state.start('Game');
        this.startBG.destroy();
        this.startText.destroy();
    }
};
