invertedRacer.StartMenu = function (game) {
    this.startBG;
    this.startText;
    this.startGame;
    this.vanEasterEgg;
};

invertedRacer.StartMenu.prototype = {
	
	create: function() {
        this.startBG = this.add.image(0, 0, 'titlescreen');
        
        this.vanEasterEgg = this.add.image(375, 290, 'candyVan');
        this.vanEasterEgg.inputEnabled = true;
        this.vanEasterEgg.events.onInputDown.addOnce(this.playerVan, this);

        this.startText = this.add.image(110, this.world.centerY, 'startGameText');
        this.startText.inputEnabled = true;
        this.startText.events.onInputDown.addOnce(this.startGame, this);
    },
    
    startGame: function (pointer) {
        this.state.start('Game');
        this.startBG.destroy();
        this.startText.destroy();
        this.vanEasterEgg.destroy();
    },
    
    playerVan: function (pointer) {
        this.vanEasterEgg.destroy();
        van = true;
    },
};
