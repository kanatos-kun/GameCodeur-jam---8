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
         current_level = "map_01";
         portalFlag = 1;
         //jsonLoad = this.cache.getJSON('json-'+current_level+"-"+1);
         jsonLoad = this.cache.getJSON('json-map_01-1');
         this.createBackgrounds();
         //this.createTileMap();

         grEnemy = this.add.group();
         grBullet = this.add.group();
         grItem = this.add.group();
         player = new Player(this.game,53,5);
         grPortals = this.add.group();

         this.loadMap();

         this.camera.follow(player);



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
     debugGame: function(){
             this.renderGroup(player);
             //grEnemy.forEachAlive(this.renderGroup,this);
             //grPortals.forEachAlive(this.renderGroup,this);
        },
     renderGroup: function (member) {
     this.game.debug.body(member);
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
   createTileMap: function(){
        map = this.add.tilemap(current_level,16,16);
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
          map.removeAllLayers();
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
             if("octopus" in jsonLoad.enemy){
                  for(var i=0;i<jsonLoad.enemy.octopus.length;i++){
                       let octopus = jsonLoad.enemy.octopus[i];
                       new Enemy.octopus(this.game,octopus.x,octopus.y);
                  }
             }
             if("jumper" in jsonLoad.enemy){
                  for(var i=0;i<jsonLoad.enemy.jumper.length;i++){
                       let jumper = jsonLoad.enemy.jumper[i];
                       new Enemy.jumper(this.game,jumper.x,jumper.y);
                  }
             }

        }

       if("player" in jsonLoad){
            player.reset(jsonLoad.player.x*16,jsonLoad.player.y*16,player.health);
       }

       player.bringToTop();
   },
   getItem : function(p, item){
        p.heal(item.health);
        item.kill();
   },
   teleporter : function(p,portal){
        current_level = portal.data.teleport;
        portalFlag = portal.data.flag;
        this.loadMap();
   },
   clearMap : function(){
        grItem.callAll('kill');
        grPortals.callAll('kill');
        grEnemy.callAll('kill');

        if(gui != null){
             gui.kill();
        }
        if(map != null) {
             this.layer1.kill();
             this.layer2.kill();
             this.layer3.kill();
        }
   },
   loadMap : function(){
        this.clearMap();
        jsonLoad = this.cache.getJSON('json-'+current_level+"-"+portalFlag);
        this.createTileMap();
        grItem = this.add.group();
        grBullet = this.add.group();
        grEnemy = this.add.group();
        grPortals = this.add.group();
        this.populate();
       gui = this.add.bitmapText(5,0,'font','energie : ' + player.health,12);
       gui.fixedToCamera = true;

}

}
