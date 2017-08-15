var item={
     orb : function(game,x,y){
          Phaser.Sprite.call(this,game,x,y,'atlas','power-up-1');
          this.anchor.setTo(.5);
          this.animations.add('run',Phaser.Animation.generateFrameNames('power-up-',1,7),10,true);
          this.animations.play('run');
          this.health = game.rnd.pick([1,7]);
          game.physics.arcade.enableBody(this);
          grItem.add(this);
     }
};

item.orb.prototype=Object.create(Phaser.Sprite.prototype);
item.orb.prototype.constructor = item.orb;
