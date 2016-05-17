invertedRacer.Instructions = function (game) {
    this.Upkey;
    this.Downkey;
    this.Leftkey;
    this.Rightkey;
    this.carHowTo
}

invertedRacer.Instructions.prototype = {
    create: function() {
        this.add.image(0, 0, 'road');
        this.Upkey = this.add.image(this.world.centerX + 5, this.world.centerY, 'wKey');
        this.Upkey.anchor.setTo(0.5, 0.5);
        this.Downkey = this.add.image(this.world.centerX + 5, this.world.centerY + 94, 'sKey');
        this.Downkey.anchor.setTo(0.5, 0.5);
        this.Leftkey = this.add.image(this.world.centerX - 95, this.world.centerY + 94, 'aKey');
        this.Leftkey.anchor.setTo(0.5, 0.5);
        this.Rightkey = this.add.image(this.world.centerX + 105, this.world.centerY + 94, 'dKey');
        this.Rightkey.anchor.setTo(0.5, 0.5);
    },
    
};