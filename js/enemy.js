var Enemy = {
     death : function(game,x,y){
          Phaser.Sprite.call(this, game, x, y, 'atlas', 'enemy-death-1');
          this.anchor.setTo(0.5);
          var anim = this.animations.add('death', Phaser.Animation.generateFrameNames('enemy-death-', 1, 5, '', 0), 18, false);
          this.animations.play('death');
          anim.onComplete.add(function () {
              let rndObject = this.game.rnd.pick([1,2,3]);

              for(let i=0;i<rndObject;i++){
                   let rndX = this.game.rnd.timestamp(-10,10);
                   let rndY = this.game.rnd.timestamp(-10,10);
                   new item.orb(this.game,this.x+rndX,this.y+rndY);
              }
              this.kill();
          }, this);
          game.add.existing(this);
     },
     crab : function(game,x,y){
          x *=16;
          y *=16;
          this.health = 5;
          Phaser.Sprite.call(this,game,x,y,"atlas","crab-idle-1");
          this.anchor.setTo(0.5);
          game.physics.arcade.enableBody(this);
          this.body.setSize(16, 25, 16, 7);
          this.body.gravity.y = 500;
          this.body.velocity.x = 60 * game.rnd.pick([1, 0]);
          this.body.bounce.x = 1;
          this.animations.add('idle', Phaser.Animation.generateFrameNames('crab-idle-', 1, 4, '', 0), 10, true);
          this.animations.add('walk', Phaser.Animation.generateFrameNames('crab-walk-', 1, 4, '', 0), 10, true);
          this.animations.play('idle');

          this.data.atk = 3;
          game.add.existing(this);
          grEnemy.add(this);
     },
     octopus : function(game,x,y){
          x *=16;
          y *=16;
          this.health = 5;
          Phaser.Sprite.call(this,game,x,y,"atlas","octopus-1");
          this.data.atk = 3;
          game.physics.arcade.enableBody(this);
          this.anchor.setTo(0.5);
          this.body.setSize(14, 22, 8, 6);
          this.animations.add('fly', Phaser.Animation.generateFrameNames('octopus-', 1, 4, '', 0), 15, true);
          this.animations.play('fly');
          var VTween = game.add.tween(this).to({
              y: y + 50
          }, 1000, Phaser.Easing.Linear.None, true, 0, -1);
         VTween.yoyo(true)
         game.add.existing(this);
         grEnemy.add(this);
    },
    jumper : function(game,x,y){
         x *=16;
         y *=16;
         this.health = 5;
         Phaser.Sprite.call(this,game,x,y,"atlas","jumper-idle-1");
         this.data.atk = 3;
         this.animations.add('idle', Phaser.Animation.generateFrameNames('jumper-idle-', 1, 4, '', 0), 7, true);
         this.animations.add('jump', ['jumper-jump'], 10, true);
         this.animations.play('idle');
         this.anchor.setTo(0.5);
         game.physics.arcade.enableBody(this);
         this.body.setSize(16, 25, 16, 8);
         this.body.gravity.y = 500;
         this.body.bounce.x = 1;
         game.time.events.loop(2000, this.jumperJump, this);
         this.dir = -1;
         game.add.existing(this);
         grEnemy.add(this);
    }
}
Enemy.crab.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.crab.prototype.contructor = Enemy.crab;

Enemy.crab.prototype.update = function () {

    if (this.body.velocity.x < 0) {
        this.scale.x = 1;
    } else {
        this.scale.x = -1;
    }

    if (this.body.velocity.x != 0) {
        this.animations.play('walk');
    } else {
        this.animations.play('idle');
    }
    if (this.health <= 0) {
        new Enemy.death(this.game, this.x, this.y);
        this.destroy();
    }

}

Enemy.octopus.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.octopus.prototype.contructor = Enemy.octopus;

Enemy.octopus.prototype.update = function () {
    if (this.x > player.x) {
        this.scale.x = 1;
    } else {
        this.scale.x = -1;
    }

    if (this.health <= 0) {
        new Enemy.death(this.game, this.x, this.y);
        this.destroy();
    }
};


Enemy.jumper.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.jumper.prototype.contructor = Enemy.jumper;

Enemy.jumper.prototype.update = function () {

    if (this.body.onFloor()) {
        this.body.velocity.x = 0;
        this.animations.play('idle');
    } else {
        this.body.velocity.x = this.dir * 60;
        this.animations.play('jump');
    }

    if (this.health <= 0) {
        new Enemy.death(this.game, this.x, this.y);
        this.destroy();

    }

}

Enemy.jumper.prototype.jumperJump = function () {
    if (!this.alive) {
        return;
    }

    this.dir *= -1;
    this.body.velocity.y = -200;

}

Enemy.death.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.death.prototype.constructor = Enemy.death;
