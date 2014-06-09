CANDLE.RENDER = function(render,width,height){
  var self = this;
  this.render = render;
  this.width = width || 1136;
  this.height = height || 640;
  this.renderer = new PIXI.autoDetectRenderer(this.width, this.height);
  this.renderer.view.style.display = "block";
  this.renderer.view.style.margin = "auto";
  this.paused = false;
  this.stage = new PIXI.Stage(0xF0FFFF, true);

  document.body.appendChild(this.renderer.view);
  CANDLE.RENDER.prototype.resize.call(this);
  $(window).resize(function(){
    CANDLE.RENDER.prototype.resize.call(self);
  });
  window.addEventListener("touchmove", function(event) {
    if (!event.target.classList.contains('scrollable')) {
      // no more scrolling
      event.preventDefault();
    }
  }, false);
};

CANDLE.RENDER.prototype = (function(){

  function resize(){
    var width = $(window).width();
    var height = $(window).height();
    if ( (height / width) > (640 / 1136)){
      this.renderer.view.style.width = $(window).width() + 'px';
      this.renderer.view.style.height = $(window).width()/1136 * 640 + 'px';
    }else{
      this.renderer.view.style.width = $(window).height()/640 * 1136 + 'px';
      this.renderer.view.style.height = $(window).height() + 'px';
    }
  }

  function play(){
    paused = false;
    requestAnimFrame(animate.bind(this));
  }

  function pause(){
    paused = true;
  }
  
  function animate(){
    if(paused)return;
    this.render();
    this.renderer.render(this.stage);
    requestAnimFrame(animate.bind(this));
  }

  return {
    resize:resize
  , play:play
  , pause:pause
  , animate:animate
  };

})();



