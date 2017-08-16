var shoot = {
     death : function(){

     },
     create : function(game,x,y,dir){
          x +=2*dir;
          if(player.isDucking){
               y+=6
          }else{
               y -=6;
          }
          Phaser.Sprite.call(this,game,x,y,'atlas','shot-1');
          this.animations.add('shot',Phaser.Animation.generateFrameNames('shot-',1,2),10,true);
          this.animations.play('shot');
          game.physics.arcade.enableBody(this);
          //this.anchor.setTo(.5);
          if(player.isTargetCeil && player.body.velocity.x ==0){
            this.body.velocity.y =-220;
          }else{
            this.body.velocity.x = 220*dir;
          }
          this.lifespan = 1000;
          this.data.atk = 1;
          this.checkWorldBounds = true;
          game.add.existing(this);
          grBullet.add(this);
     }

};

shoot.create.prototype=Object.create(Phaser.Sprite.prototype);
shoot.create.prototype.constructor = shoot.create;
shoot.create.prototype.update= function(){
     if (!this.inWorld) {
         this.destroy();
     }
}
