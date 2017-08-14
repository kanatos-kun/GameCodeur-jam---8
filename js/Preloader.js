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

          this.load.image('tileset','assets/environment/tilesets.png');
          this.load.image('walls', 'assets/environment/walls.png');
          this.load.image('background', 'assets/environment/background.png');
          this.load.image('middleground', 'assets/environment/middleground.png');
          this.load.image('title-screen','assets/sprites/title-screen.png');
          this.load.image('press-enter-text','assets/sprites/press-enter-text.png');
          this.load.image('instructions','assets/sprites/instructions.png');
          this.load.image('credits-text','assets/sprites/credits-text.png');

          //atlas
          this.load.atlasJSONHash('atlas','assets/atlas/atlas.png','assets/atlas/atlas.json');
          this.load.atlasJSONArray('atlas-props', 'assets/atlas/atlas-props.png', 'assets/atlas/atlas-props.json');
          this.load.bitmapFont('font','assets/font/font.png','assets/font/font.xml');

     },

     create:function(){
          this.state.start('MainMenu');
     }
}
