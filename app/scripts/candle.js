var CANDLE = {
  kSpace : 'kSpace'
, kTab : 'kTab'
};

CANDLE.GAME = function(loader,setup,update){
  var self = this;

  PIXI.EventTarget.call(this);

  this.loader = loader;
  this.setup = setup;
  this.update = update;
  this.input = new CANDLE.INPUT();
  this.render = new CANDLE.RENDER(this.update,962,551);
  this.loader.load();
  this.stage = this.render.stage;
  this.loader.addEventListener('onComplete', function(){
    self.setup();
    self.render.play();
  });
};


