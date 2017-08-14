var control={};
var background;
var middleground;
Game.MainMenu = function(game){
     this.game = game;
     this.var={};
}

Game.MainMenu.prototype = {
     create : function(){
          background   = this.add.tileSprite(0,0,this.world.width,this.world.height,"background");
          middleground = this.add.tileSprite(0,0,this.world.width,this.world.height,"middleground");

          this.title = this.add.image(this.world.centerX,80,'title-screen');
          this.title.anchor.setTo(.5);
          this.credit      = this.add.image(this.world.centerX,this.world.centerY + 70,'credits-text');
          this.credit.anchor.setTo(.5);
          this.press_enter = this.add.image(this.world.centerX,this.world.centerY + 30,'press-enter-text');
          this.press_enter.anchor.setTo(.5);


          controls = {
              right : this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
              left  : this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
              up    : this.input.keyboard.addKey(Phaser.Keyboard.UP),
              down    : this.input.keyboard.addKey(Phaser.Keyboard.DOWN),
              shoot    : this.input.keyboard.addKey(Phaser.Keyboard.D),
              enter    : this.input.keyboard.addKey(Phaser.Keyboard.ENTER),
              z : this.input.keyboard.addKey(Phaser.Keyboard.Z)
         }

         this.time.events.loop(700, this.blinkText, this);

         controls.enter.onDown.add(this.gameStart,this);
         this.var.state = 1
     },
     update : function(){
          middleground.tilePosition.y -=.5;
     },
    blinkText: function () {
        if (this.press_enter.alpha) {
            this.press_enter.alpha = 0;
        } else {
            this.press_enter.alpha = 1;
        }
   },
   gameStart : function(){
        if(this.var.state == 1 ){
             this.var.state = 2;
             this.title.destroy();
             this.credit.destroy();
             this.press_enter.destroy();
             this.instruction = this.add.image(this.world.centerX,80,'instructions');
             this.instruction.anchor.setTo(.5);
        }else{
           this.state.start('Level1');
        }
   }
}
