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

          this.load.json('json-map_01-1','assets/json/json-map_01-1.json');
          this.load.json('json-map_01-2','assets/json/json-map_01-2.json');
          this.load.json('json-map_01-3','assets/json/json-map_01-3.json');
          this.load.json('json-map_02-1','assets/json/json-map_02-1.json');
          this.load.json('json-map_02-2','assets/json/json-map_02-2.json');
          this.load.json('json-map_02-3','assets/json/json-map_02-3.json');
          this.load.json('json-map_02-4','assets/json/json-map_02-4.json');
          this.load.json('json-map_02-5','assets/json/json-map_02-5.json');
          this.load.json('json-map_02-6','assets/json/json-map_02-6.json');
          this.load.json('json-map_03-1','assets/json/json-map_03-1.json');
          this.load.json('json-map_04-1','assets/json/json-map_04-1.json');
          this.load.json('json-map_05-1','assets/json/json-map_05-1.json');
          this.load.json('json-map_06-1','assets/json/json-map_06-1.json');

          // this.load.tilemap("map","assets/maps/map.json",null, Phaser.Tilemap.TILED_JSON);
          this.load.tilemap("map_01","assets/maps/map_01.json",null, Phaser.Tilemap.TILED_JSON);
          this.load.tilemap("map_02","assets/maps/map_02.json",null, Phaser.Tilemap.TILED_JSON);
          this.load.tilemap("map_03","assets/maps/map_03.json",null, Phaser.Tilemap.TILED_JSON);
          this.load.tilemap("map_04","assets/maps/map_04.json",null, Phaser.Tilemap.TILED_JSON);
          this.load.tilemap("map_05","assets/maps/map_05.json",null, Phaser.Tilemap.TILED_JSON);
          this.load.tilemap("map_06","assets/maps/map_06.json",null, Phaser.Tilemap.TILED_JSON);

          this.load.image('tileset','assets/environment/tileset.png');
          this.load.image('walls', 'assets/environment/walls.png');
          this.load.image('background', 'assets/environment/background.png');
          this.load.image('middleground', 'assets/environment/middleground.png');
          this.load.image('title-screen','assets/sprites/title-screen2.png');
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
