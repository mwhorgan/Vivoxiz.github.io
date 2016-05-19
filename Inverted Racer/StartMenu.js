invertedRacer.StartMenu = function (game) {
    this.startBG;
    this.startText;
    this.startGame;
    this.vanEasterEgg;
    this.instruct;
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
        
        this.instruct = this.add.bitmapText(150, this.world.centerY + 100, 'VCR_OSD', 'INSTRUCTIONS', 54);
        this.instruct.tint = 0xF9891C;
        this.instruct.inputEnabled = true;
        this.instruct.events.onInputDown.addOnce(this.howToPlay, this);
    },
    
    startGame: function (pointer) {
        this.state.start('Game');
        this.startBG.destroy();
        this.startText.destroy();
    },
    
    playerVan: function (pointer) {
        this.vanEasterEgg.destroy();
        van = true;
    },
    
    howToPlay: function (pointer) {
        this.startText.destroy();
        this.instruct.destroy();
        this.startBG.destroy();
        this.vanEasterEgg.destroy();
        this.startText.destroy();
        this.state.start('Instructions');
    },
};
