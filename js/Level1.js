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
var player;
var gui;
var current_level;
var portalFlag;
var grPortals;
var jsonLoad;

Game.Level1.prototype = {
     create : function(){
         this.stage.backgroundColor = '#466e7a';
         current_level = "map01";
         //jsonLoad = this.cache.getJSON('json-'+current_level+"-"+1);
         jsonLoad = this.cache.getJSON('json-map01-1');
         this.createBackgrounds();
         this.createTileMap();

         grEnemy = this.add.group();
         grBullet = this.add.group();
         grItem = this.add.group();
         player = new Player(this.game,53,5);
         grPortals = this.add.group();

         this.loadMap();


         this.camera.follow(player);

         gui = this.add.bitmapText(5,0,'font','energie : ' + player.health,12);
         gui.fixedToCamera = true;

     //     this.time.events.loop(20,player.data.alphaPlayer,player,player);
     //     this.time.events.stop();
     },

     update:function(){

          //middleground.tilePosition.y -= .2;
          this.parallaxBackground();
          gui.text = 'energie : ' + player.health;
         this.physics.arcade.collide(player, this.layer2);
         this.physics.arcade.collide(grEnemy, this.layer2);
         this.physics.arcade.collide(grBullet, this.layer2,this.hitWall,null,this);
         this.physics.arcade.collide(grItem, this.layer2);
         this.physics.arcade.overlap(grBullet,grEnemy,this.hitEnnemy,null,this);
         this.physics.arcade.overlap(player,grEnemy,this.playerIsHurt,null,this);
         this.physics.arcade.overlap(player,grItem,this.getItem,null,this);
         this.physics.arcade.overlap(player,grPortals,this.teleporter,null,this);
     },
     render: function(){
          //this.debugGame();
          //this.game.debug.text("time remained : " + player.data.timer[1].duration,0,12,"#000000");
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
        this.renderGroup(player);
        //grEnemy.forEachAlive(this.renderGroup,this);
        //grPortals.forEachAlive(this.renderGroup,this);
   },
   renderGroup: function (member) {
    this.game.debug.body(member);
   },
   createTileMap: function(){
        map = this.add.tilemap("map_01",16,16);
        map.addTilesetImage("tileset");
        map.addTilesetImage('walls');
        this.layer1 = map.createLayer('layer 1');
        this.layer1.resizeWorld();
        this.layer2 = map.createLayer('layer 2');
        this.layer2.resizeWorld();
        this.layer2.alpha = 0;
        this.layer3 = map.createLayer('layer 3');
        this.layer3.resizeWorld();
       // collision
          map.setCollision(46,true,'layer 2');
     //   map.setCollisionBetween(27, 31,true,"layer 2");
     //   map.setCollision(33,true,"layer 2");
     //   map.setCollisionBetween(182, 185,true,"layer 2");
     //   map.setCollisionBetween(182, 185,true,"layer 2");
     //   map.setCollision(81,true,"layer 2");
     //   map.setCollision(83,true,"layer 2");
     //   map.setCollision(85,true,"layer 2");
     //   map.setCollision(87,true,"layer 2");
     //   map.setCollision(89,true,"layer 2");
     //   map.setCollision(114,true,"layer 2");
     //   map.setCollision(116,true,"layer 2");
     //   map.setCollision(93,true,"layer 2");
     //   map.setCollision(170,true,"layer 2");
     //   map.setCollisionBetween(172, 173,true,"layer 2");
     //   map.setCollision(175,true,"layer 2");
     //   map.setCollision(177,true,"layer 2");
     //   map.setCollisionBetween(179, 180,true,"layer 2");
     //   map.setCollision(166,true,"layer 2");
     //   map.setCollision(214,true,"layer 2");
     //   map.setCollision(215,true,"layer 2");
     //   map.setCollision(238,true,"layer 2");
     //   map.setCollision(239,true,"layer 2");
     //   map.setCollisionBetween(254, 257,true,"layer 2");
     //   map.setCollision(76,true,"layer 2");
     //   map.setCollision(100,true,"layer 2");
     //   map.setCollision(78,true,"layer 2");
     //   map.setCollision(102,true,"layer 2");
     //   map.setCollision(248,true,"layer 2");
     //   map.setCollision(249,true,"layer 2");
     //   map.setCollision(251,true,"layer 2");
     //   map.setCollision(252,true,"layer 2");
     //   map.setCollision(259,true,"layer 2");
     //   map.setCollision(260,true,"layer 2");
     //   map.setCollision(119,true,"layer 2");
     //   map.setCollision(206,true,"layer 2");
     //   map.setCollision(230,true,"layer 2");
     //   map.setCollision(209,true,"layer 2");
     //   map.setCollision(233,true,"layer 2");
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
        enemy.health -= shot.data.atk;
        shot.kill();
   },
   playerIsHurt : function(p,enemy){
        if(p.isInvinsible){
             return;
        }
        p.damage(enemy.data.atk);
        p.isHurt = true;
        p.isInvinsible = true;
        p.data.timer[0].start();
        p.data.timer[1].start();
        p.body.velocity.y =-150;
        p.body.velocity.x = p.scale.x>0 ? -100:100;
   },
   populate : function(){

        //monster
        new Enemy.crab(this.game,18,26);
        new item.portal(this.game,0,24,new Phaser.Point(1,1),'level02-1');
        new item.portal(this.game,0,12,new Phaser.Point(1,1),'level02-2');
   },
   getItem : function(p, item){
        p.heal(item.health);
        item.kill();
   },
   teleporter : function(p,portal){
        current_level = portal.data.teleport;
        portalFlag = portal.data.flag;
        this.clearMap();
   },
   clearMap : function(){

   },
   loadMap : function(){


        if("portal" in jsonLoad){
             for(var i=0;i<jsonLoad.portal.length;i++){
                  let portal = jsonLoad.portal[i];
                  new item.portal(this.game,portal.x,portal.y,new Phaser.Point(portal.scale[0],portal.scale[1]),
                  portal.tp,portal.flag);
             }
        }

        if("enemy" in jsonLoad){

             if("crab" in jsonLoad.enemy){
                  for(var i=0;i<jsonLoad.enemy.crab.length;i++){
                       let crab = jsonLoad.enemy.crab[i];
                       new Enemy.crab(this.game,crab.x,crab.y);
                  }
             }

        }

       if("player" in jsonLoad){
            player.reset(jsonLoad.player.x*16,jsonLoad.player.y*16,player.health);
       }

   }
}
