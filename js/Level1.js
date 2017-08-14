Game.Level1 = function(game){this.game = game};
var gameWidth = 240;
var gameHeight = 176;
var map;
var background;
var middleground;
var playerSpeed= 150;
var jumpTimer = 0;
var grEnemy;
var grBullet;
var grItem;
var nextShot;

Game.Level1.prototype = {
     create : function(){
         this.stage.backgroundColor = '#466e7a';

         this.createBackgrounds();
         this.createTileMap();

         grEnemy = this.add.group();
         grBullet = this.add.group();
         grItem = this.add.group();

         player = this.add.sprite(150,300,'atlas','player-idle-1');
         player.anchor.setTo(0.5,0.5);
         player.isDucking = false;
         player.maxHealth = 100;
         player.health = 100;

         player.animations.add('idle',Phaser.Animation.generateFrameNames('player-idle-',1,4),5,true);
         player.animations.add('jump',Phaser.Animation.generateFrameNames('player-jump-',1,6),10,true);
         player.animations.add('run',Phaser.Animation.generateFrameNames('player-run-',1,10),7,true);
         player.animations.add('duck',['player-duck'],10,true);

         this.physics.arcade.enable(player);
         player.body.setSize(11, 40, 35, 24);

         this.camera.follow(player);
         player.body.collideWorldBounds = true;
         player.body.gravity.y = 500;
         new Enemy.crab(this.game,15,19);

         var gui = this.add.bitmapText(5,0,'font','life : ' + player.health,12);
         gui.fixedToCamera = true;
     },

     update:function(){
          //middleground.tilePosition.y -= .2;
          this.parallaxBackground();

         this.physics.arcade.collide(player, this.layer3);
         this.physics.arcade.collide(grEnemy, this.layer3);
         this.physics.arcade.collide(grBullet, this.layer3,this.hitWall,null,this);
         this.physics.arcade.collide(grItem, this.layer3);

         this.physics.arcade.overlap(grBullet,grEnemy,this.hitEnnemy,null,this);

         player.body.velocity.x = 0;

         if(controls.right.isDown && !player.isDucking){
            if(player.body.onFloor()){
            player.animations.play('run');
            }
            player.animation = "run";
            player.scale.setTo(1,1);
            player.body.velocity.x += playerSpeed;
       }else if(controls.right.isDown && player.isDucking){
            player.scale.setTo(1,1);
       }

         if(controls.left.isDown && !player.isDucking){
            if(player.body.onFloor()){
            player.animations.play('run');
            }
            player.animation = "run";
            player.scale.setTo(-1,1);
            player.body.velocity.x -= playerSpeed;
       }else if(controls.left.isDown && player.isDucking){
            player.scale.setTo(-1,1);
       }

         if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) &&
           this.time.now > jumpTimer){
             player.animation = "jump";
             player.animations.play('jump');
             player.body.velocity.y = -250;
             jumpTimer = this.time.now + 750;
         }

         if(controls.shoot.isDown){
              if(nextShot > this.time.now){
                   return;
              }
              nextShot = this.time.now +200;
              var shot = new shoot.create(this.game,player.x,player.y,player.scale.x);
         }

         if(player.body.velocity.x == 0  && player.body.velocity.y ==0){
             player.animations.play('idle');
         }

         if(controls.down.isDown){
              player.animations.play('duck');
              player.isDucking = true;
         }else{
              player.isDucking = false;
         }

     },
     render: function(){
          //this.debugGame();
     },
     parallaxBackground: function () {
         middleground.tilePosition.x = this.layer1.x * -0.5;
    },
     createBackgrounds: function () {
        background = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
        middleground = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'middleground');
        background.fixedToCamera = true;
        middleground.fixedToCamera = true;
   },
   debugGame: function(){
        grEnemy.forEachAlive(this.renderGroup,this);
   },
   renderGroup: function (member) {
    this.game.debug.body(member);
   },
   createTileMap: function(){
        map = this.add.tilemap("map_02",16,16);
        map.addTilesetImage("tileset");

        this.layer1 = map.createLayer('layer 1');
        this.layer1.resizeWorld();
        this.layer2 = map.createLayer('layer 2');
        this.layer2.resizeWorld();
        this.layer3 = map.createLayer('layer 3');
        this.layer3.resizeWorld();
       // collision
       map.setCollisionBetween(27, 31,true,"layer 3");
       map.setCollision(33,true,"layer 3");
       map.setCollisionBetween(182, 185,true,"layer 3");
       map.setCollisionBetween(182, 185,true,"layer 3");
       map.setCollision(81,true,"layer 3");
       map.setCollision(83,true,"layer 3");
       map.setCollision(85,true,"layer 3");
       map.setCollision(87,true,"layer 3");
       map.setCollision(89,true,"layer 3");
       map.setCollision(114,true,"layer 3");
       map.setCollision(116,true,"layer 3");
       map.setCollision(93,true,"layer 3");
       map.setCollision(170,true,"layer 3");
       map.setCollisionBetween(172, 173,true,"layer 3");
       map.setCollision(175,true,"layer 3");
       map.setCollision(177,true,"layer 3");
       map.setCollisionBetween(179, 180,true,"layer 3");
       map.setCollision(166,true,"layer 3");
       map.setCollision(214,true,"layer 3");
       map.setCollision(215,true,"layer 3");
       map.setCollision(238,true,"layer 3");
       map.setCollision(239,true,"layer 3");
       map.setCollisionBetween(254, 257,true,"layer 3");
       map.setCollision(76,true,"layer 3");
       map.setCollision(100,true,"layer 3");
       map.setCollision(78,true,"layer 3");
       map.setCollision(102,true,"layer 3");
       map.setCollision(248,true,"layer 3");
       map.setCollision(249,true,"layer 3");
       map.setCollision(251,true,"layer 3");
       map.setCollision(252,true,"layer 3");
       map.setCollision(259,true,"layer 3");
       map.setCollision(260,true,"layer 3");
       map.setCollision(119,true,"layer 3");
       map.setCollision(206,true,"layer 3");
       map.setCollision(230,true,"layer 3");
       map.setCollision(209,true,"layer 3");
       map.setCollision(233,true,"layer 3");
       // one way
//        this.setOneWayCollision(38);
//        this.setOneWayCollision(42);
//        this.setOneWayCollision(187);
//        this.setOneWayCollision(188);
   },
   hitWall : function(shot,wall){
        shot.kill();
   },
   hitEnnemy : function(shot,enemy){
        console.log(enemy.health);
        enemy.health -= shot.data.atk;
        shot.kill();
   }
}
