var Game = {};

Game.Boot = function(game){

};

Game.Boot.prototype={
     init:function(){
          this.input.maxPointers = 1;
          this.stage.disableVisibility = true;
     },
     preload:function(){
          this.load.image('preloaderBar','assets/preloader.png');
     },
     create:function(){
          this.scale.pageAlignHorizontally = true;
          this.scale.pageAlignVertically = true;
          this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          this.game.renderer.renderSession.roundPixels = true; // no blurring
          this.state.start('Preloader');
     }
}
