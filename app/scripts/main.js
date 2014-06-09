var loader = new CANDLE.LOADER('images/',['atlas.json','lcd.xml']);

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
  setupAudio();

  function setupAudio(){
    var audio = document.getElementById('audio');
    lucky7.audio = new AudioSprite(audio, spriteData);
  }

  function setupKeybaord(){
    lucky7.input.addKey(CANDLE.kSpace,function(){
      respond();
    });
  }

  function respond(){
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
    window.setInteractive(true);
    window.tap = window.click = function(){
      respond();
    };
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
    mask.drawRect(50,450,390,40);
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
    lucky7.balance = 1000;
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
    var i,j;
    lucky7.state = 'spinning';
    for(i=0;i<3;i++){
      lucky7.reels[i].visible = true;
      lucky7.reels[i].gotoAndPlay(i*2);
    }
    for(i = 0;i<3;i++){
      lucky7.reels[i].visible = true;
    }
    lucky7.texts[0].x = 180;
    lucky7.texts[0].setText('GOOD LUCK');
    lucky7.texts[0].flashSpeed = 0.08;
    lucky7.texts[0].flash = 0;
    lucky7.texts[1].x = 180 + 350;
    lucky7.texts[1].setText('GOOD LUCK');
    lucky7.texts[1].flashSpeed = 0.08;
    lucky7.texts[1].flash = 0;



    if(!lucky7.outcome){
      for(i = 0;i<3;i++){
        for(j= 0;j<3;j++){
          lucky7.symbos[i][j].visible = false;
        }
      }
      setTimeout(spinning,500);
    }else{
      lucky7.audio.play('reels');
      for(i = 0;i<3;i++){
        for(j= 0;j<3;j++){
          lucky7.symbos[i][j].visible = false;
          var name = symboNames[(lucky7.outcome.payline[j] - i + 8) % 7];
          setToSymbo.call(lucky7.symbos[i][j],name,'on');
        }
      }
      setTimeout(stop1,4000);
    }
  }

  function stop1(){
    lucky7.audio.play('stop');
    lucky7.state = 'stop1';
    console.log('stop1');
    lucky7.reels[0].visible = false;
    for(var i=0;i<3;i++){
      for(var j=0;j<3;j++){
        if(j === 0){
          lucky7.symbos[i][j].visible = true;
          lucky7.symbos[i][j].gotoAndStop(0);
        }
      }
    }
    setTimeout(stop2,1000);
  }

  function stop2(){
    lucky7.audio.play('stop');
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
    setTimeout(stop3,1000);
  }

  function stop3(){
    lucky7.audio.play('stop');
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
    setTimeout(money,1000);
  }

  function money(){
    lucky7.state = 'money';
    for(var i=0;i<3;i++){
      for(var j=0;j<3;j++){
        if(i === 1){
          if(lucky7.outcome.win !== 0)
            lucky7.symbos[i][j].gotoAndPlay(1);
          else
            lucky7.symbos[i][j].gotoAndStop(1);
        }else{
          lucky7.symbos[i][j].gotoAndStop(1);
        }
      }
    }
    lucky7.texts[0].visible = true;
    lucky7.texts[0].setText('WIN: ' + lucky7.outcome.win);
    lucky7.texts[0].x = 50;

    lucky7.texts[1].visible = true;
    lucky7.texts[1].setText('BALANCE: ' + lucky7.balance);
    lucky7.texts[1].x = 200;

    lucky7.start = lucky7.balance;
    lucky7.end = lucky7.balance + lucky7.outcome.win;
    if(lucky7.outcome.win === 0){
      setTimeout(idle, 500);
    }else{
      lucky7.audio.play('win');
      console.log(lucky7.outcome.win);
      setTimeout(idle, 9000);
    }
  }

  function idle(){
    lucky7.state = 'idle';
    lucky7.texts[0].visible = true;
    lucky7.texts[1].visible = true;
    lucky7.texts[0].x = 100;
    lucky7.texts[1].x = 450;
    if(lucky7.outcome.win <= 100 && lucky7.outcome.win > 0){
      lucky7.texts[0].setText('SMALL WIN ' + lucky7.outcome.win);
      lucky7.texts[1].setText('BALANCE ' + lucky7.balance);
      lucky7.audio.play('smallWin');
    }else if(lucky7.outcome.win > 100){
      lucky7.texts[0].setText('BIG WIN ' + lucky7.outcome.win);
      lucky7.texts[1].setText('BALANCE ' + lucky7.balance);
      lucky7.audio.play('bigWin');
    }else{
      lucky7.texts[0].setText('NO MONEY' );
      lucky7.texts[1].setText('BALANCE ' + lucky7.balance);
      lucky7.audio.play('noMoney');
    }
  }

  function bet(){
    lucky7.outcome = null;
    lucky7.balance -= 10;
    lucky7.balance = (lucky7.balance < 0) ? 0 : lucky7.balance;
    lucky7.outcome = cheet();
    // $.getJSON('http://localhost:3000/bet?id=larry&&coin=10&&bet=1',{cache:false},function(data){
    //   lucky7.outcome = data;
    //   console.log(lucky7.outcome);
    // });
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
    lucky7.texts[0].visible = round % 2 === 0;
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
    lucky7.balance = lucky7.balance + lucky7.outcome.win / 500;
    lucky7.balance = (lucky7.balance > lucky7.end) ? lucky7.end : lucky7.balance;
    lucky7.texts[1].setText('BALANCE: ' + Math.floor(lucky7.balance));
    console.log('money');
  }

  function idle(){
    lucky7.balance = lucky7.end;
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

function cheet(){
  var id = 'larry';
  var coin = 10;
  var bet = 1;

  //calculate cash depending on parameters
  var cash = coin*bet;

  //random generate row1, row2 and row3: integer: 0~6
  var row1 = Math.floor(Math.random() * 7);
  var row2 = Math.floor(Math.random() * 7);
  var row3 = Math.floor(Math.random() * 7);

  //calcualte the result cents
  var win = 0;

  //any 1 cherry
  if(row1 === 4 || row2 === 4 || row3 === 4) { win =  Math.floor (2 * cash );}

  //3 any bar
  if(( 1 <= row1 && row1 <=3 ) && ( 1 <= row2 && row2 <=3 ) && ( 1 <= row3 && row3 <=3 ) ) { win =   Math.floor (3 * cash);}

  //any 2 cherry
  if(row1 === 4 && row2 === 4 ) { win =  Math.floor (10 * cash );}
  if(row1 === 4 && row3 === 4 ) { win =  Math.floor (10 * cash );}
  if(row2 === 4 && row3 === 4 ) { win =  Math.floor (10 * cash );}

  
  //3  bar 1, 2, 3
  if(row1 === 1 && row2 === 1 && row3 === 1) { win =  Math.floor (20 * cash );}
  if(row1 === 2 && row2 === 2 && row3 === 2) { win =  Math.floor (50 * cash );}
  if(row1 === 3 && row2 === 3 && row3 === 3) { win =  Math.floor (100 * cash );}

  //3  cherries
  if(row1 === 4 && row2 === 4 && row3 === 4) { win =  Math.floor (150 * cash );}

  //3  luky 7
  if(row1 === 5 && row2 === 5 && row3 === 5) { win =  Math.floor (250 * cash );}

  //3  7
  if(row1 === 6 && row2 === 6 && row3 === 6) { win =  Math.floor (1000 * cash );}

  //3  7  and bet = 3
  if(row1 === 6 && row2 === 6 && row3 === 6 && bet === 3) { win =  Math.floor (5000 * cash );}
  
  return {
    id: id,
    win: win,
    coin: coin,
    bet: bet,
    cash: cash,
    payline:[(6-row1),(6-row2),(6-row3)]
  };


}