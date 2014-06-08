var loader = new CANDLE.LOADER('/images/',['atlas.json','lcd.xml']);

var lucky7 = new CANDLE.GAME(loader,setup,update);

function setup(){
  var input = lucky7.input;
  var stage = lucky7.stage;
  var symboNames = ['seven','lucky','cherry','3bar','2bar','1bar','blank'];

  setupReelTextures();
  setupSymboTextures();
  setupKeybaord();
  setupBackground();
  setupReels();
  setupSymbos();
  setupText();
  setupWindow();

  init();

  function setupKeybaord(){
    lucky7.input.addKey(CANDLE.kSpace,function(){
      switch(lucky7.state){
      case 'init':
      case 'idle':
        bet();
        spinning();
        break;
      case 'spinning':
      case 'stop1':
      case 'stop2':
      case 'stop3':
      case 'money':
        break;
      default:
        console.log('error');
      }
    });
  }

  function setupBackground(){
    var background = new PIXI.Sprite.fromFrame('background.png');
    stage.addChild(background);
    lucky7.background = background;
  }

  function setupReels(){
    var background = lucky7.background;
    var reel1 = new PIXI.MovieClip(lucky7.reelTextures);
    reel1.animationSpeed = 0.5;
    reel1.x = 160;
    reel1.y = 131;
    background.addChild(reel1);

    var reel2 = new PIXI.MovieClip(lucky7.reelTextures);
    reel2.animationSpeed = 0.5;
    reel2.x = 410;
    reel2.y = 131;
    background.addChild(reel2);

    var reel3 = new PIXI.MovieClip(lucky7.reelTextures);
    reel3.animationSpeed = 0.5;
    reel3.x = 660;
    reel3.y = 131;
    background.addChild(reel3);

    var reels = [reel1,reel2,reel3];
    lucky7.reels = reels;
  }

  function setupSymbos(){
    var background = lucky7.background;
    var symbos = [];
    for(var i=0;i<3;i++){
      var row = [];
      for(var j=0;j<3;j++){
        symbo = new PIXI.MovieClip([lucky7.symboTextures.seven0,lucky7.symboTextures.seven1]);
        symbo.animationSpeed = 0.08;
        symbo.x = 260 + 250 * j;
        symbo.y = 157 + 110 * i;
        if(i !== 1) symbo.scale.y = 0.3;
        symbo.anchor = {x:0.5,y:0.5};
        background.addChild(symbo);
        row[j] = symbo;
      }
      symbos[i] = row;
    }
    lucky7.symbos = symbos;
  }

  function setupWindow(){
    var background = lucky7.background;
    var window = new PIXI.Sprite.fromFrame('window.png');
    window.x = 143;
    window.y = 118;
    background.addChild(window);
  }

  function setupReelTextures(){
    var textures = [];
    for(var i=0;i<6;i++){
      var texture = new PIXI.Texture.fromFrame('reels-' + i + '.png');
      textures[i] = texture;
    }
    lucky7.reelTextures = textures;
  }

  function setupSymboTextures(){
    var textures = {};
    var names = ['seven0','seven1','cherry0','cherry1','lucky0','lucky1','1bar0','1bar1','2bar0','2bar1','3bar0','3bar1','blank'];
    for(var i in names){
      var name = names[i];
      textures[name] =  new PIXI.Texture.fromFrame(name + '.png');
    }
    lucky7.symboTextures = textures;
  }



  function setToSymbo(symbo,state){
    if(symbo === 'blank'){
      this.textures = [lucky7.symboTextures.blank];
      return;
    }
    this.textures = [lucky7.symboTextures[symbo+'0'],lucky7.symboTextures[symbo+'1']];
    switch(state){
    case 'on':
      this.gotoAndStop(0);
      break;
    case 'off':
      this.gotoAndStop(1);
      break;
    case 'flash':
      this.gotoAndPlay(0);
      break;
    }
  }

  function setupText(){
    var mask = new PIXI.Graphics();
    mask.beginFill(0);
    mask.drawRect(50,200,390,500);
    lucky7.stage.addChild(mask);
    console.log(PIXI.BitmapText.fonts);
    var text0 = new PIXI.BitmapText("", {font: "28px LCD", align: "right"});
    text0.x = 100;
    text0.y = 461;
    text0.mask = mask;
    var text1 = new PIXI.BitmapText("", {font: "28px LCD", align: "right"});
    text1.x = 450;
    text1.y = 461;
    text1.mask = mask;
    lucky7.texts = [text0,text1];
    lucky7.stage.addChild(text0);
    lucky7.stage.addChild(text1);
  }

  function init(){
    lucky7.state = 'init';
    var initSymbos = ['seven','seven','seven','lucky','lucky','lucky','cherry','cherry','cherry'];
    for(var i = 0;i<3;i++){
      for(var j= 0;j<3;j++){
        setToSymbo.call(lucky7.symbos[i][j],initSymbos[i*3+j],'on');
      }
    }
    for(i = 0;i<3;i++){
      lucky7.reels[i].visible = false;
    }
    lucky7.texts[0].setText('TAP TO SPIN');
    lucky7.texts[1].setText('TAP TO SPIN');
  }

  function spinning(){
    lucky7.state = 'spinning';
    for(var i=0;i<3;i++){
      lucky7.reels[i].visible = true;
      lucky7.reels[i].gotoAndPlay(i*2);
    }
    for(i = 0;i<3;i++){
      for(var j= 0;j<3;j++){
        lucky7.symbos[i][j].visible = false;
        var name = symboNames[(lucky7.outcome.payline[j] - i + 8) % 7];
        setToSymbo.call(lucky7.symbos[i][j],name,'on');
      }
    }
    for(i = 0;i<3;i++){
      lucky7.reels[i].visible = true;
    }
    lucky7.texts[0].x = 180;
    lucky7.texts[0].setText('GOOD LUCK');
    lucky7.texts[0].flashSpeed = 0.08;
    lucky7.texts[0].flash = 0;
    lucky7.texts[1].x = 180 + 350;
    setTimeout(stop1,1000);
  }

  function stop1(){
    lucky7.state = 'stop1';
    console.log('stop1');
    lucky7.reels[0].visible = false;
    for(var i=0;i<3;i++){
      for(var j=0;j<3;j++){
        if(j === 0){
          lucky7.symbos[i][j].visible = true;
        }
      }
    }
    setTimeout(stop2,500);
  }

  function stop2(){
    lucky7.state = 'stop2';
    lucky7.reels[1].visible = false;
    for(var i=0;i<3;i++){
      for(var j=0;j<3;j++){
        if(j === 1){
          lucky7.symbos[i][j].visible = true;
          lucky7.symbos[i][j].gotoAndStop(0);
        }
      }
    }
    setTimeout(stop3,500);
  }

  function stop3(){
    lucky7.state = 'stop3';
    lucky7.reels[2].visible = false;
    for(var i=0;i<3;i++){
      for(var j=0;j<3;j++){
        if(j === 2){
          lucky7.symbos[i][j].visible = true;
          lucky7.symbos[i][j].gotoAndStop(0);
        }
      }
    }
    setTimeout(money,50);
  }

  function money(){
    lucky7.state = 'money';
    for(var i=0;i<3;i++){
      for(var j=0;j<3;j++){
        if(i === 1){
          lucky7.symbos[i][j].gotoAndPlay(1);
        }else{
          lucky7.symbos[i][j].gotoAndStop(1);
        }
      }
    }
    setTimeout(idle,500);
  }

  function idle(){
    lucky7.state = 'idle';
    lucky7.texts[0].setText('TAP TO SPIN');
    lucky7.texts[1].setText('TAP TO SPIN');
  }

  function bet(){
    lucky7.outcome = {"win":"1000","payline":[4,5,6]};
  }
}



function update(){
  switch(lucky7.state){
  case 'init':
    init();
    break;
  case 'spinning':
    spinning(0);
    break;
  case 'stop1':
    stop1();
    break;
  case 'stop2':
    stop2();
    break;
  case 'stop3':
    stop3();
    break;
  case 'money':
    money();
    break;
  case 'idle':
    idle();
    break;
  default:
    console.log('error');
  }

  function init(){
    rotateTexts();
  }

  function spinning(n){
    lucky7.texts[0].flash += lucky7.texts[0].flashSpeed;
    var round = Math.floor(lucky7.texts[0].flash);
    lucky7.texts[0].visible = round % 2 ;
  }

  function stop1(){
    console.log('stop1');
    spinning(1);
  }

  function stop2(){
    console.log('stop2');
    spinning(2);
  }

  function stop3(){
    console.log('stop3');
    spinning(3);
  }

  function money(){
    console.log('money');
  }

  function idle(){
    rotateTexts();
  }

  function rotateTexts(){
    for(var i in lucky7.texts){
      var text = lucky7.texts[i];
      text.x = text.x - 1;
      if(text.x < -200){
        text.x = 500;
      }
    }
  }

}