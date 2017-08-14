var Player = function(game,x,y){
     Phaser.Sprite.call(this,game,x,y,'atlas','player-idle-1');
     this.anchor.setTo(0.5,0.5);
     this.isDucking = false;
     this.maxHealth = 100;
     this.health = 100;
     this.animations.add('idle',Phaser.Animation.generateFrameNames('player-idle-',1,4),5,true);
     this.animations.add('jump',Phaser.Animation.generateFrameNames('player-jump-',1,6),10,true);
     this.animations.add('run',Phaser.Animation.generateFrameNames('player-run-',1,10),7,true);
     this.animations.add('duck',['player-duck'],10,true);
     this.body.setSize(11, 40, 35, 24);
     this.body.collideWorldBounds = true;
     this.body.gravity.y = 500;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
     this.data.commands();
     this.data.animate();
}

Player.prototype.commands = function(){

}

Player.data.animate.prototype = function(){

}
