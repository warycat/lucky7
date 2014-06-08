CANDLE.INPUT = function(keyString, debug){
  this.keys = {};
  this.callbacks = {};
  this.debug = debug || false;
  this.keyString = keyString || '';
  window.addEventListener('keydown', CANDLE.INPUT.prototype.keydown.bind(this));
  window.addEventListener('keyup', CANDLE.INPUT.prototype.keyup.bind(this));
};

CANDLE.INPUT.prototype = (function(){

  function keydown (event){
    var keyCode = event.keyCode;
    var keyChar = CANDLE.INPUT.prototype.codeToChar(keyCode);
    if(this.debug)console.log(keyCode,keyChar);
    if(this.keys.hasOwnProperty(keyChar)){
      event.preventDefault();
      this.keys[keyChar] = 'down';
      this.callbacks[keyChar].call(this);
    }
  }

  function keyup(event){
    var keyCode = event.keyCode;
    var keyChar = String.fromCharCode(keyCode);
    if(this.keys.hasOwnProperty(keyChar)){
      event.preventDefault();
      this.keys[keyChar] = 'up';
    }
  }

  function codeToChar(keyCode){
    switch(keyCode){
    case 9:
      return CANDLE.kTab;
    case 13:
      return CANDLE.kEnter;
    case 32:
      return CANDLE.kSpace;
    default:
      return String.fromCharCode(keyCode);
    }
  }

  function addKey(keyChar,callback){
    if(!this.keys.hasOwnProperty(keyChar)){
      this.keys[keyChar] = 'up';
      this.callbacks[keyChar] = callback;
    }
  }

  return {
    keydown:keydown
  , keyup:keyup
  , codeToChar:codeToChar
  , addKey:addKey
  };
})();

