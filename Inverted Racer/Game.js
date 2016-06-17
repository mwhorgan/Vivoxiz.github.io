invertedRacer.Game = function (game) {
    this.gameover;
    this.hit;
    this.lives;
    this.end;
    this.endscore;
    this.playAgain;
    this.life;
    this.p1;
    this.road;
    this.road2;
    this.titlescreen;
    this.upKey1;
    this.downKey1;
    this.leftKey1;
    this.rightKey1;
    this.gravKey1;
    this.enemies;
//    this.bushes;
//    this.bush;
    this.cone;
    this.moveCoeff;
    // IDEA ! ! !  When collide with police, lose all lives.
    this.test;
    this.testText;
    this.testdouble;
    this.music;
    this.boom;
};

invertedRacer.Game.prototype = {
    
    create: function () {
        this.gameover = false;
        this.hit = false;
        this.lives = 3;
        this.test = 0;
        this.testdouble = 0;
        this.van = false;
        
        this.upKey1 = this.input.keyboard.addKey(Phaser.Keyboard.W);
        this.downKey1 = this.input.keyboard.addKey(Phaser.Keyboard.S);
        this.leftKey1 = this.input.keyboard.addKey(Phaser.Keyboard.A);
        this.rightKey1 = this.input.keyboard.addKey(Phaser.Keyboard.D);
        this.gravKey1 = this.input.keyboard.addKey(Phaser.Keyboard.E);

        this.music = this.add.audio('game_audio');
        this.music.play('', 0, 0.3, true);
        this.boom = this.add.audio('explosion_audio');
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.buildWorld();
    },
    
    
    buildWorld: function () {
//        this.beginRoad = this.add.image(0, 0, 'road');
        
        this.buildRoad();
//        this.buildPlayer();
        this.buildEnemies();
                
        this.p1 = this.add.sprite(160, (this.world.height - 80), 'car1');
        this.physics.arcade.enable(this.p1);
        this.p1.body.collideWorldBounds = true;
        this.p1.body.bounce.x = 0.2;
        this.p1.body.bounce.y = 0.2;
        this.p1.anchor.setTo(0.5, 0.5);
        this.p1.spinning = false;
        
        this.testText = this.add.bitmapText(this.world.centerX - 200, 50, 'VCR_OSD', 'SCORE: 0', 64);
        this.testText.tint = 0xFD9B0F;
        this.life = this.add.bitmapText(this.world.centerX - 80, 20, 'VCR_OSD', 'Lives: 3', 32);
        this.life.tint = 0xFD9B0F;

        this.p1Texture();
        
    },
    
    p1Texture: function () {        
        if (van === true) {
            this.p1.loadTexture('candyVan2', 0);
        } else {
            this.p1.loadTexture('car1', 0);
        }
    },
    
    buildRoad: function () {
        
        this.road = this.add.sprite(0, 0, 'road');
        this.road.basevelocity = 2500;
        this.physics.arcade.enable(this.road);
        this.road.body.velocity.y = 2500;

        this.road2 = this.add.sprite(0, -960, 'road2');
        this.road2.basevelocity = 2500;
        this.physics.arcade.enable(this.road2);
        this.road2.body.velocity.y = 2500;

    },
    
//    buildPlayer: function () {
//
//    },
    
    buildEnemies: function () {
        this.enemies = this.add.group();
        this.physics.arcade.enable(this.enemies);
        this.enemies.enableBody = true;

        for (var i = 0; i < 8; i++){
            this.lane = this.rnd.integerInRange(0, 3);
            this.enemy = this.enemies.create((this.lane * 122) + 133,  0 - this.rnd.integerInRange(0, 686), 'enemy1.1');
            this.enemy.basevelocity = 0;
            this.enemy.crashing = false;
            this.random = this.rnd.integerInRange(1, 3);
            this.random2 = this.rnd.integerInRange(100, 400);
            this.enemy.AI = this.random;
            this.enemy.whenDo = this.random2;
            this.value = this.rnd.integerInRange(1, 3);
            if (this.value == 1){
                this.enemies.getAt(i).body.velocity.y = 250;
                this.enemies.getAt(i).basevelocity = 250;
                this.enemies.getAt(i).loadTexture('enemy1.1'); 
                this.enemies.getAt(i).body.x = this.enemies.getAt(i).body.x - this.enemies.getAt(i).body.halfWidth;
            } else if (this.value == 2){
                this.enemies.getAt(i).body.velocity.y = 150;
                this.enemies.getAt(i).basevelocity = 150;
                this.enemies.getAt(i).loadTexture('enemy2.1');
                this.enemies.getAt(i).body.x = this.enemies.getAt(i).body.x - this.enemies.getAt(i).body.halfWidth;
            } else if (this.value == 3){
                this.enemies.getAt(i).body.velocity.y = 200;
                this.enemies.getAt(i).basevelocity = 200;
                this.enemies.getAt(i).loadTexture('enemy3.1');
                this.enemies.getAt(i).body.x = this.enemies.getAt(i).body.x - this.enemies.getAt(i).body.halfWidth;
            }
            this.physics.arcade.enable(this.enemy);
        }
                
        this.cones = this.add.group();
        this.physics.arcade.enable(this.cones);
        this.cones.enableBody = true;
        
        for (var i = 0; i < 1; i++){
            this.laneCone = this.rnd.integerInRange(0, 2);
            this.Tcone = this.cones.create((this.laneCone * 122) + 210,  0 - this.rnd.integerInRange(0, 686), 'cone');
            this.Tcone.crashing = false;
            this.Tcone.basevelocity - 0;
            this.randomC = this.rnd.integerInRange(1, 3);
            this.random2C = this.rnd.integerInRange(100, 400);
            this.Tcone.AI = this.randomC;
            this.Tcone.whenDo = this.random2C;
            this.valueC = this.rnd.integerInRange(1, 3);
            if (this.valueC == 1){
                this.cones.getAt(i).body.velocity.y = 280;
                this.cones.getAt(i).basevelocity = 280;
                this.cones.getAt(i).body.x = this.cones.getAt(i).body.x - this.cones.getAt(i).body.halfWidth;
            } else if (this.valueC == 2){
                this.cones.getAt(i).body.velocity.y = 280;
                this.cones.getAt(i).basevelocity = 280;
                this.cones.getAt(i).body.x = this.cones.getAt(i).body.x - this.cones.getAt(i).body.halfWidth;
            } else if (this.valueC == 3){
                this.cones.getAt(i).body.velocity.y = 280;
                this.cones.getAt(i).basevelocity = 280;
                this.cones.getAt(i).body.x = this.cones.getAt(i).body.x - this.cones.getAt(i).body.halfWidth;
            }
            this.physics.arcade.enable(this.Tcone);
        }
        
        this.bushes = this.add.group();
        this.physics.arcade.enable(this.bushes);
        this.bushes.enableBody = true;
        
//        for (var i = 0; i < 70; i++){
//            this.laneBush = this.rnd.integerInRange(0, 5);
//            this.bBush = this.bushes.create((this.laneBush * 116) + 15,  (0 - 20) - this.rnd.integerInRange(0, 686), 'bush');
//            this.bBush.crashing = false;
//            this.bBush.basevelocity - 0;
//            this.randomB = this.rnd.integerInRange(1, 1);
//            this.random2B = this.rnd.integerInRange(100, 400);
//            this.bBush.AI = this.randomB;
//            this.bBush.whenDo = this.random2B;
//            this.valueB = this.rnd.integerInRange(1, 1);
//            if (this.valueB == 1 && this.laneBush == 0 || this.laneBush == 5){
//                this.bushes.getAt(i).body.velocity.y = 280;
//                this.bushes.getAt(i).basevelocity = 280;
//                this.bushes.getAt(i).body.x = this.bushes.getAt(i).body.x - this.bushes.getAt(i).body.halfWidth;
//            } else {}
//            this.physics.arcade.enable(this.bBush);
//        }
        
        for (var i = 0; i < 5; i++) {
            this.bBush;
            this.laneBush = this.rnd.integerInRange(0, 5);
            this.spawnDelay = this.rnd.integerInRange(20, 3000);
            if (this.laneBush == 0) {
                this.bBush = this.bushes.create(15, (0 - 20) - this.rnd.integerInRange(0, 686), 'bush');
            } else if (this.laneBush == 1) {
                this.bBush = this.bushes.create(595, (0 - 20) - this.rnd.integerInRange(0, 686), 'bush');
            } else {
                this.bBush = this.bushes.create(1200, (0 - 20) - this.rnd.integerInRange(0, 686), 'bush');
            }
            this.bBush.crashing = false;
            this.bBush.basevelocity - 0;
            this.randomB = this.rnd.integerInRange(1, 1);
            this.random2B = this.rnd.integerInRange(100, 400);
            this.bBush.AI = this.randomB;
            this.bBush.whenDo = this.random2B;
            this.valueB = this.rnd.integerInRange(1, 1);
            if (this.valueB == 1) {
                this.bushes.getAt(i).body.velocity.y = 280;
                this.bushes.getAt(i).basevelocity = 280;
                this.bushes.getAt(i).body.x = this.bushes.getAt(i).body.x - this.bushes.getAt(i).body.halfWidth;
            } else {}
            this.physics.arcade.enable(this.bBush);
        }
    },

    roadMovement: function () {
        if (this.road.body.y > 960 && this.gameover === false){
            this.road.body.y = -960;
            this.road2.body.y = this.road.body.y + 960;
        } else if (this.road2.body.y > 960 && this.gameover === false){
            this.road2.body.y = -960;
            this.road.body.y = this.road2.body.y + 960;
        } else if (this.gameover === true) {
            this.road.body.y = 0;
            this.road.body.velocity.y = 0;
            this.road2.body.y - 0;
            this.road2.body.velocity.y = 0;
        }
    
    },
   
    playerBorders: function () {
    
        if (this.p1.body.y > 960 - this.p1.body.height) {
            this.p1.body.y = 960 - this.p1.body.height;
        } else if (this.p1.body.y < 0) {
            this.p1.body.y = 0;
        }   
    },
    
    playerMovement: function () {
        var mod = 1;
        if (this.p1.body.x + this.p1.body.width > 585){
            mod = 0.3;
        } else if (this.p1.body.x < 105){
            mod = 0.3;
        }
        if (!this.hit){
            if (this.gameover === false) {
                this.testdouble += mod;
                this.test = Math.floor(this.testdouble);
                this.testText.text = "Score: " + this.test;
                if (this.leftKey1.isDown){
                    this.p1.angle = -5;
                    this.p1.body.velocity.x = -180 * mod;

                } else if (this.rightKey1.isDown){
                    this.p1.angle = 5;
                    this.p1.body.velocity.x = 180 * mod;

                } else {
                    this.p1.angle = 0;
                    this.p1.body.velocity.x = this.p1.body.velocity.x / 1.2;
                }

                if (this.upKey1.isDown){ 
                    this.p1.body.velocity.y = -100 * mod;
    //                road.body.velocity.y = 160;
                } else if (this.downKey1.isDown){
                    this.p1.body.velocity.y = 150 * mod;
    //                road.body.velocity.y = -50;
                } else {
                    this.p1.body.velocity.y = 0;
    //                road.body.velocity.y = 100;
                }
            }
        } else {
            this.p1.angle -= -5;
            if (this.p1.angle <= 0 && this.p1.angle >= -5){
                this.hit = false;
                this.p1.spinning = false;
            }
        }
//        for (var i = 0; i < this.enemies.length; i++){
//            this.enemies.getAt(i).body.velocity.y = this.enemies.getAt(i).basevelocity * mod;
//        }
//        for (var i = 0; i < this.cones.length; i++){
//            this.cones.getAt(i).body.velocity.y = this.cones.getAt(i).basevelocity * mod;
//        }
//        for (var i = 0; i < this.bushes.length; i++){
//            this.bushes.getAt(i).body.velocity.y = this.bushes.getAt(i).basevelocity * mod;
//        }
//        this.road.body.velocity.y = this.road.basevelocity * mod;
//        this.road2.body.velocity.y = this.road.basevelocity * mod;
    },

    carCollide: function(a, b){
                        
        if (!b.crashing){
            if (this.gameover === false) {
                this.test -= 50;
                this.testdouble -= 50;
                this.testText.text = "Score: " + this.test;
                b.crashing = true;
                this.boom.play();
                this.diffX = b.body.x + b.body.halfWidth - a.body.x - a.body.halfWidth;
                this.diffY = b.body.y + b.body.halfHeight - a.body.y - a.body.halfHeight;
                if (this.diffX > 0){
                    b.body.acceleration.x = -200;
                } else {
                    b.body.acceleration.x = 200;
                }
                if (this.diffY > 0){
                    b.body.velocity.y = 50;
                } else {
                    b.body.velocity.y = -50;
                }
                this.ratio = Math.atan(this.diffY / this.diffX);
                if (this.diffX > 0){
                    this.p1.body.velocity.x = 50 * Math.cos(this.ratio);
                    this.moveCoeff = -50 * Math.sin(this.ratio);
                } else {
                    this.p1.body.velocity.x = -50 * Math.cos(this.ratio);
                    this.moveCoeff = 50 * Math.sin(this.ratio);
                }
                if (!this.p1.spinning){
                    this.p1.angle = 10;
                }
                this.hit = true;
                this.lives -= 1;
                this.life.text = "Lives: " + this.lives;
                
                this.checkLivesLeft();
            }
        }
    },
    
    bushCollide: function(a, b){
                        
        if (!b.crashing){
            if (this.gameover === false) {
                this.test -= 50;
                this.testdouble -= 50;
                this.testText.text = "Score: " + this.test;
                b.crashing = true;
                this.diffX = b.body.x + b.body.halfWidth - a.body.x - a.body.halfWidth;
                this.diffY = b.body.y + b.body.halfHeight - a.body.y - a.body.halfHeight;
                b.destroy();
                this.ratio = Math.atan(this.diffY / this.diffX);
                if (this.diffX > 0){
                    this.p1.body.velocity.x = 50 * Math.cos(this.ratio);
                    this.moveCoeff = -50 * Math.sin(this.ratio);
                } else {
                    this.p1.body.velocity.x = -50 * Math.cos(this.ratio);
                    this.moveCoeff = 50 * Math.sin(this.ratio);
                }
                if (!this.p1.spinning){
                    this.p1.angle = 10;
                }
                this.hit = true;
                this.lives -= 1;
                this.life.text = "Lives: " + this.lives;
                
                this.checkLivesLeft();
            }
        }
    },
    
    respawnEnemy: function () {
        for (var i = 0; i < this.enemies.children.length; i++){
            if(this.gameover === false && this.enemies.getAt(i).body.y > 960 || this.enemies.getAt(i).body.x > 686 || this.enemies.getAt(i).body.x < 0){
                this.lane = this.rnd.integerInRange(0, 3);
                this.enemies.getAt(i).reset((this.lane * 124) + 162, 0 - (this.rnd.integerInRange(0, 686)));
                this.enemies.getAt(i).crashing = false;
                this.value = this.rnd.integerInRange(1, 3);
                if (this.value == 1){
                    this.enemies.getAt(i).body.velocity.y = 250;
                    this.enemies.getAt(i).basevelocity = 250;
                    this.enemies.getAt(i).loadTexture('enemy1.1');
                    this.enemies.getAt(i).body.x = this.enemies.getAt(i).body.x - this.enemies.getAt(i).body.halfWidth;
                } else if (this.value == 2){
                    this.enemies.getAt(i).body.velocity.y = 150;
                    this.enemies.getAt(i).basevelocity = 150;
                    this.enemies.getAt(i).loadTexture('enemy2.1');
                    this.enemies.getAt(i).body.x = this.enemies.getAt(i).body.x - this.enemies.getAt(i).body.halfWidth;
                } else if (this.value == 3){
                    this.enemies.getAt(i).body.velocity.y = 200;
                    this.enemies.getAt(i).basevelocity = 200;
                    this.enemies.getAt(i).loadTexture('enemy3.1');
                    this.enemies.getAt(i).body.x = this.enemies.getAt(i).body.x - this.enemies.getAt(i).body.halfWidth;
                }
            }
        }
    },
    
    respawnCone: function () {
                
        for (var i = 0; i < this.cones.children.length; i++){
            if(this.gameover === false && this.cones.getAt(i).body.y > 960 || this.cones.getAt(i).body.x > 686 || this.cones.getAt(i).body.x < 0) {
                this.laneCone = this.rnd.integerInRange(0, 2);
                this.cones.getAt(i).reset((this.laneCone * 122) + 225,  0 - this.rnd.integerInRange(0, 686));
                this.cones.getAt(i).crashing = false;
                this.valueC = this.rnd.integerInRange(1, 3);
                if (this.valueC == 1){
                    this.cones.getAt(i).body.velocity.y = 280;
                    this.cones.getAt(i).basevelocity = 280;
                    this.cones.getAt(i).body.x = this.cones.getAt(i).body.x - this.cones.getAt(i).body.halfWidth;
                } else if (this.valueC == 2){
                    this.cones.getAt(i).body.velocity.y = 280;
                    this.cones.getAt(i).basevelocity = 280;
                    this.cones.getAt(i).body.x = this.cones.getAt(i).body.x - this.cones.getAt(i).body.halfWidth;
                } else if (this.valueC == 3){
                    this.cones.getAt(i).body.velocity.y = 280;
                    this.cones.getAt(i).basevelocity = 280;
                    this.cones.getAt(i).body.x = this.cones.getAt(i).body.x - this.cones.getAt(i).body.halfWidth;
                }
            }
        }
    },
    
    respawnBush: function () {
                
        for (var i = 0; i < this.bushes.children.length; i++){
            if(this.gameover === false && this.bushes.getAt(i).body.y > 960 || this.bushes.getAt(i).body.x > 686 || this.bushes.getAt(i).body.x < 0) {
                this.laneBush = this.rnd.integerInRange(0, 5);
                if (this.laneBush == 0) {
                    this.bushes.getAt(i).reset(50,  (0 - 20) - this.rnd.integerInRange(0, 686));
                } else if (this.laneBush == 1) {
                    this.bushes.getAt(i).reset(640,  (0 - 20) - this.rnd.integerInRange(0, 686));
                } else {
                    this.bushes.getAt(i).reset(1200,  (0 - 20) - this.rnd.integerInRange(0, 686));
                }
                this.bushes.getAt(i).crashing = false;
                this.valueB = this.rnd.integerInRange(1, 1);
                if (this.valueB == 1){
                    this.bushes.getAt(i).body.velocity.y = 280;
                    this.bushes.getAt(i).basevelocity = 280;
                    this.bushes.getAt(i).body.x = this.bushes.getAt(i).body.x - this.bushes.getAt(i).body.halfWidth;
                } else {}
            }
        }
    },
    
//    && this.laneBush == 0 || this.laneBush == 5
        
    checkLivesLeft: function () {    
        if (this.lives <= 0) {
            this.p1.body.velocity.x = 0;
            this.p1.body.velocity.y = 0;
            this.p1.destroy();
            this.enemies.destroy();
            this.cones.destroy();
            this.bushes.destroy();
            this.gameover = true;
            this.music.stop();
            
            var delay = 500;
            this.explosion1 = this.add.sprite(this.p1.body.x, this.p1.body.y, 'boom1');
            setTimeout(function () {
                this.explosion1.destroy();
            }, delay);
            
            this.end = this.add.bitmapText(180, 120, 'VCR_OSD', 'GAME \nOVER!', 120);
            this.endscore = this.add.bitmapText(200, 500, 'VCR_OSD', 'Score: ' + this.test, 48);
            this.playAgain = this.add.bitmapText(150, 800, 'VCR_OSD', 'PLAY AGAIN?', 64);
            this.quit = this.add.bitmapText(220, 890, 'VCR_OSD', 'Main Menu', 48);
            this.quit.tint = 0xFFA22F;
            this.playAgain.tint = 0xFD9B0F;
            this.endscore.tint = 0xFD9B0F;
            this.end.tint = 0xFD9B0F;
            this.testText.text = "";
            this.life.text = "";
            this.playAgain.inputEnabled = true;
            this.playAgain.events.onInputDown.addOnce(this.restart,this);
            this.quit.inputEnabled = true;
            this.quit.events.onInputDown.addOnce(this.mainMenu,this);
            
        } else {
            this.life.text = "Lives: " + this.lives;
        }
    },
    
                
    restart: function(pointer) {
        this.test = 0;
        this.testdouble = 0;
        this.state.start('Game');
    },
    
    mainMenu: function (pointer) {
        this.test = 0;
        this.testdouble = 0;
        this.state.start('StartMenu');
    },
    
    update: function() {
        this.physics.arcade.overlap(this.p1, this.enemies, this.carCollide, null, this);
        this.physics.arcade.overlap(this.p1, this.cones, this.carCollide, null, this);
        this.physics.arcade.overlap(this.p1, this.bushes, this.bushCollide, null, this);
        this.physics.arcade.collide(this.enemies);
        this.playerBorders();
        this.playerMovement();
        this.respawnEnemy();
        this.respawnCone();
        this.respawnBush();
        this.roadMovement();
        

    }
};








