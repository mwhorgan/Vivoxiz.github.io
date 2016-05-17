invertedRacer.Preloader = function (game) {
    this.ready = false;
    van = false;
};

invertedRacer.Preloader.prototype = {
	
	 preload: function () {
		
        this.load.bitmapFont('eightbitwonder', 'fonts/eightbitwonder.png', 'fonts/eightbitwonder.fnt');
        this.load.bitmapFont('Ipixelu', 'fonts/Ipixelu/Ipixelu.png', 'fonts/Ipixelu/Ipixelu.fnt');
        this.load.bitmapFont('VCR_OSD', 'fonts/VCR_OSD_MONO_1.001/VCR_OSD_MONO_1.001.png', 'fonts/VCR_OSD_MONO_1.001/VCR_OSD_MONO_1.001.fnt');
         
        this.load.image('car1', 'assets/car1.png');
        this.load.image('enemy1.1', 'assets/enemy1.1.png');
        this.load.image('enemy2.1', 'assets/enemy2.1.png');
        this.load.image('enemy3.1', 'assets/enemy3.1.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('road', 'assets/4lane.png');
        this.load.image('road2', 'assets/4lane5.png');
        this.load.image('candyVan', 'assets/Candy_van.png');
        this.load.image('candyVan2', 'assets/Candy_van2.png');
        this.load.image('catCar', 'assets/CatCar.png');
        this.load.image('police', 'assets/Police.png');
        this.load.image('taxi', 'assets/taxi.png');
        this.load.image('cone', 'assets/traffic cone.png');

        this.load.image('boom1', 'assets/explosion1.fw.png');
    },
    
    create:function () {},
    
    update: function () {
        if (this.ready === false) {
            this.ready = true;
            this.state.start('StartMenu');
        }
    }
};