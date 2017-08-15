var item={
     orb : function(game,x,y){
          Phaser.Sprite.call(this,game,x,y,'atlas','power-up-1');
          this.anchor.setTo(.5);
          this.animations.add('run',Phaser.Animation.generateFrameNames('power-up-',1,7),10,true);
          this.animations.play('run');
          this.health = game.rnd.pick([1,7]);
          game.physics.arcade.enableBody(this);
          grItem.add(this);
     },
     portal : function(game,x,y,dir,tp,flag){
          x *=16;
          y *=16;
          Phaser.Sprite.call(this,game,x,y,'atlas-props','gate-01');
          this.scale = dir;
          this.data.teleport = tp;
          this.data.flag = flag;
          this.animations.add('open',Phaser.Animation.generateFrameNames('gate-0',1,3,'',1),1,true);
          this.animations.add('close',Phaser.Animation.generateFrameNames('gate-0',1,3,'',1).reverse(),1,false);
          this.animations.play('close');
          game.physics.arcade.enableBody(this);
          this.body.setSize(19,48);
          grPortals.add(this);
     }
};

item.orb.prototype=Object.create(Phaser.Sprite.prototype);
item.orb.prototype.constructor = item.orb;

item.portal.prototype=Object.create(Phaser.Sprite.prototype);
item.portal.prototype.constructor = item.portal;
