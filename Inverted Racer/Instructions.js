invertedRacer.Instructions = function (game) {
    this.Upkey;
    this.Downkey;
    this.Leftkey;
    this.Rightkey;
    this.UpkeyBlue;
    this.DownkeyBlue;
    this.RightkeyBlue;
    this.LeftkeyBlue;
    this.secondsElapsed;
    this.dLkeyBlue;
    this.road;
    this.road2;
    this.infoP1;
    this.carHowTo;
};

invertedRacer.Instructions.prototype = {
    create: function() {
        
        this.road = this.add.sprite(0, 0, 'road');
        this.physics.arcade.enable(this.road);
        this.road.body.velocity.y = 2500;

        this.road2 = this.add.sprite(0, -960, 'road2');
        this.physics.arcade.enable(this.road2);
        this.road2.body.velocity.y = 2500;
        
        this.Upkey = this.add.image(this.world.centerX + 5, this.world.centerY + 30, 'wKey');
        this.Upkey.anchor.setTo(0.5, 0.5);
        this.Downkey = this.add.image(this.world.centerX + 5, this.world.centerY + 124, 'sKey');
        this.Downkey.anchor.setTo(0.5, 0.5);
        this.Leftkey = this.add.image(this.world.centerX - 95, this.world.centerY + 124, 'aKey');
        this.Leftkey.anchor.setTo(0.5, 0.5);
        this.Rightkey = this.add.image(this.world.centerX + 105, this.world.centerY + 124, 'dKey');
        this.Rightkey.anchor.setTo(0.5, 0.5);
        
        this.timer = this.time.create(false);
        this.timer.loop(1000, this.infoSec, this);
        this.secondsElapsed = 0;
        
        this.infoPrep();

        this.mainText = this.add.bitmapText(220, 880, 'VCR_OSD', 'Main Menu', 54);
        this.mainText.inputEnabled = true;
        this.mainText.events.onInputDown.addOnce(this.infoMain, this);
    },
    
    infoSec: function () {
        this.secondsElapsed++;
    },
    
    infoPrep: function () {
        this.infoP1 = this.add.sprite(this.world.centerX + 5, this.world.centerY - 170, 'car1');
        this.infoP1.anchor.setTo(0.5, 0.5);
        this.physics.arcade.enable(this.infoP1);
        this.timer.start();
    },
    
    infoRoad: function () {
        if (this.road.body.y > 960){
            this.road.body.y = -960;
            this.road2.body.y = this.road.body.y + 960;
        } else if (this.road2.body.y > 960){
            this.road2.body.y = -960;
            this.road.body.y = this.road2.body.y + 960;
        }
    },
     
    infoMain: function (pointer) {
        this.state.start('StartMenu');
        this.mainText.destroy();
    },
    
    update: function() {
        this.infoRoad();
        if (this.secondsElapsed == 1 || this.secondsElapsed == 2) {
            if (this.dLkeyBlue == true) {
                this.dLkeyBlue = false;
                this.LeftkeyBlue.destroy();
                this.Leftkey = this.add.image(this.world.centerX - 95, this.world.centerY + 124, 'aKey');
                this.Leftkey.anchor.setTo(0.5, 0.5);
                this.infoP1.body.velocity.x = 0;
                this.infoP1.angle = 0;
            } this.Upkey.destroy();
            this.UpkeyBlue = this.add.image(this.world.centerX + 5, this.world.centerY + 30, 'BwKey');
            this.UpkeyBlue.anchor.setTo(0.5, 0.5);
            this.road.body.velocity.y = 6000;
            this.road2.body.velocity.y = 6000;
            this.infoP1.angle = 0;
        } else if (this.secondsElapsed == 3 || this.secondsElapsed == 4) {
            this.UpkeyBlue.destroy();
            this.Upkey = this.add.image(this.world.centerX + 5, this.world.centerY + 30, 'wKey');
            this.Upkey.anchor.setTo(0.5, 0.5);
            this.Downkey.destroy();
            this.DownkeyBlue = this.add.image(this.world.centerX + 5, this.world.centerY + 124, 'BsKey');
            this.DownkeyBlue.anchor.setTo(0.5, 0.5);
            this.road.body.velocity.y = 1000;
            this.road2.body.velocity.y = 1000;
            this.infoP1.angle = 0;
        } else if (this.secondsElapsed == 5 || this.secondsElapsed == 6) {
            this.DownkeyBlue.destroy();
            this.Downkey = this.add.image(this.world.centerX + 5, this.world.centerY + 124, 'sKey');
            this.Downkey.anchor.setTo(0.5, 0.5);
            this.Rightkey.destroy();
            this.RightkeyBlue = this.add.image(this.world.centerX + 105, this.world.centerY + 124, 'BdKey');
            this.RightkeyBlue.anchor.setTo(0.5, 0.5);
            this.road.body.velocity.y = 2500;
            this.road2.body.velocity.y = 2500;
            this.infoP1.angle = 5;
            this.infoP1.body.velocity.x = 100;
        } else if (this.secondsElapsed == 7 || this.secondsElapsed == 8) {
            this.RightkeyBlue.destroy();
            this.Rightkey = this.add.image(this.world.centerX + 105, this.world.centerY + 124, 'dKey');
            this.Rightkey.anchor.setTo(0.5, 0.5);
            this.Leftkey.destroy();
            this.LeftkeyBlue = this.add.image(this.world.centerX - 95, this.world.centerY + 124, 'BaKey');
            this.LeftkeyBlue.anchor.setTo(0.5, 0.5);
            this.road.body.velocity.y = 2500;
            this.road2.body.velocity.y = 2500;
            this.infoP1.angle = -5;
            this.infoP1.body.velocity.x = -100;
        } else if (this.secondsElapsed > 8) {
            this.secondsElapsed = 1;
            this.dLkeyBlue = true;
        }
    }
};



