Game.Preloader = function(game){
     this.preloadBar = null;
};

 Game.Preloader.prototype = {
      preload:function(){

           this.preloadBar = this.add.sprite(this.world.centerX,
                                             this.world.centerY,'preloaderBar');
          this.preloadBar.anchor.setTo(0.5,0.5);
          this.time.advancedTiming = true;
          this.load.setPreloadSprite(this.preloadBar);

          //LOAD ALL ASSETS


          this.load.tilemap("map","assets/maps/map.json",null, Phaser.Tilemap.TILED_JSON);
          this.load.tilemap("map_02","assets/maps/map_02.json",null, Phaser.Tilemap.TILED_JSON);

          //this.load.image('tileset','assets/eL76q6W.png');
          this.load.image('tileset','assets/environment/tilesets.png');
          this.load.image('walls', 'assets/environment/walls.png');
          this.load.image('background', 'assets/environment/background.png');
          this.load.image('middleground', 'assets/environment/middleground.png');
          this.load.atlasJSONHash('atlas','assets/atlas/atlas.png','assets/atlas/atlas.json');
          this.load.atlasJSONArray('atlas-props', 'assets/atlas/atlas-props.png', 'assets/atlas/atlas-props.json');
//          this.load.spritesheet('player','assets/player.png',24,26);
//          this.load.spritesheet('player-idle','assets/player-idle.png',31,47);
//          this.load.spritesheet('player-run','assets/player-run.png',48,51);
//          this.load.spritesheet('player-jump','assets/player-jump.png',60,64);

     },

     create:function(){
          this.state.start('Level1');
     }
}
