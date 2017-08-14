var Player = function(game,x,y){
     Phaser.Sprite.call(this,game,x,y,'atlas','player-idle-1');
     this.anchor.setTo(0.5,0.5);
     this.isDucking = false;
     this.isTargetCeil = false;
     this.maxHealth = 100;
     this.health = 100;
     this.data.speed = Player.prototype.data.prototype.speed;
     this.animations.add('idle',Phaser.Animation.generateFrameNames('player-idle-',1,4),5,true);
     this.animations.add('jump',Phaser.Animation.generateFrameNames('player-jump-',1,6),10,true);
     this.animations.add('run',Phaser.Animation.generateFrameNames('player-run-',1,10),7,true);
     this.animations.add('fall',Phaser.Animation.generateFrameNames('player-jump-',3,6),10,true);
     this.animations.add('shooting',Phaser.Animation.generateFrameNames('player-stand-',1,3),10,true);
     this.animations.add('duck',['player-duck'],10,false);
     this.animations.add('hurt', Phaser.Animation.generateFrameNames('player-hurt-', 1, 2, '', 0), 4, false);
     this.animations.add('run-shot', Phaser.Animation.generateFrameNames('player-run-shot-', 1, 10, '', 0), 10, true);
     this.animations.add('target-ceil',['player-shoot-up'],10,false);
     game.physics.arcade.enable(this);
     game.add.existing(this);
     this.body.setSize(11, 40, 35, 24);
     this.body.collideWorldBounds = true;
     this.body.gravity.y = 500;
     // this.data = Player.prototype.data.call(this);
     this.data.commands = Player.prototype.data.commands;
     this.data.animate = Player.prototype.data.animate;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
     this.data.commands(this);
     this.data.animate(this);
}


Player.prototype.data.prototype = Object.prototype;
Player.prototype.data.prototype.constructor = Player;
Player.prototype.data.commands = function(player){
     player.body.velocity.x = 0;
     if(controls.right.isDown && !player.isDucking){
       player.scale.setTo(1,1);
       player.body.velocity.x += player.data.speed;
  }else if(controls.right.isDown && player.isDucking){
       player.scale.setTo(1,1);
  }

     if(controls.left.isDown && !player.isDucking){
       player.scale.setTo(-1,1);
       player.body.velocity.x -= player.data.speed;
  }else if(controls.left.isDown && player.isDucking){
       player.scale.setTo(-1,1);
  }

     if(controls.z.isDown && (player.body.onFloor() || player.body.touching.down) &&
       player.game.time.now > jumpTimer){
         player.body.velocity.y = -250;
         jumpTimer = player.game.time.now + 750;
     }

     if(controls.shoot.isDown){
         if(nextShot > player.game.time.now){
               return;
         }
         nextShot = player.game.time.now +200;
         var shot = new shoot.create(player.game,player.x,player.y,player.scale.x);
     }

     if(controls.down.isDown){
         player.isDucking = true;
     }else{
         player.isDucking = false;
     }

     if(controls.up.isDown){
          player.isTargetCeil = true;
     }else{
          player.isTargetCeil = false;
     }
}
// Player.data.commands.prototype = Object.create(function.prototype);
// Player.data.commands.prototype.constructor = Player.data.commands;


Player.prototype.data.animate = function(player){

     if(player.body.velocity.x !=0 && player.body.onFloor() &&
       !player.isDucking && !controls.shoot.isDown){
          player.animations.play('run');
     }

     if(player.body.velocity.x ==0 && player.body.onFloor() &&
        !player.isDucking && !controls.shoot.isDown){
          player.animations.play('idle');
     }

     if(player.body.velocity.y >0 && !player.body.onFloor() &&
        !player.isDucking){
          player.animations.play('jump');
     }else if(player.body.velocity.y <0 && !player.body.onFloor() &&
        !player.isDucking){
          player.animations.play('fall');
        }

     if(player.body.velocity.x ==0 && player.body.onFloor() &&
        player.isDucking){
            player.animations.play('duck');
        }

     if(controls.shoot.isDown && player.body.onFloor() &&
     !player.isDucking && player.body.velocity.x == 0){
          player.animations.play('shooting');
          console.log("shoot");
     }

     if(controls.shoot.isDown && player.body.onFloor() &&
     !player.isDucking && player.body.velocity.x != 0){
          player.animations.play('run-shot');
     }

     if(controls.up.isDown && !player.isDucking &&
        player.body.velocity.x ==0){
          player.animations.play('target-ceil');
        }

}
Player.prototype.data.prototype.speed=150;
Player.prototype.data.prototype.speed.constructor = player;
