function setup(){function a(){var a=document.getElementById("audio");lucky7.audio=new AudioSprite(a,spriteData)}function b(){lucky7.input.addKey(CANDLE.kSpace,function(){c()})}function c(){switch(lucky7.state){case"init":case"idle":s(),m();break;case"spinning":case"stop1":case"stop2":case"stop3":case"money":break;default:console.log("error")}}function d(){var a=new PIXI.Sprite.fromFrame("background.png");t.addChild(a),lucky7.background=a}function e(){var a=lucky7.background,b=new PIXI.MovieClip(lucky7.reelTextures);b.animationSpeed=.5,b.x=160,b.y=131,a.addChild(b);var c=new PIXI.MovieClip(lucky7.reelTextures);c.animationSpeed=.5,c.x=410,c.y=131,a.addChild(c);var d=new PIXI.MovieClip(lucky7.reelTextures);d.animationSpeed=.5,d.x=660,d.y=131,a.addChild(d);var e=[b,c,d];lucky7.reels=e}function f(){for(var a=lucky7.background,b=[],c=0;3>c;c++){for(var d=[],e=0;3>e;e++)symbo=new PIXI.MovieClip([lucky7.symboTextures.seven0,lucky7.symboTextures.seven1]),symbo.animationSpeed=.08,symbo.x=260+250*e,symbo.y=157+110*c,1!==c&&(symbo.scale.y=.3),symbo.anchor={x:.5,y:.5},a.addChild(symbo),d[e]=symbo;b[c]=d}lucky7.symbos=b}function g(){var a=lucky7.background,b=new PIXI.Sprite.fromFrame("window.png");b.setInteractive(!0),b.tap=b.click=function(){c()},b.x=143,b.y=118,a.addChild(b)}function h(){for(var a=[],b=0;6>b;b++){var c=new PIXI.Texture.fromFrame("reels-"+b+".png");a[b]=c}lucky7.reelTextures=a}function i(){var a={},b=["seven0","seven1","cherry0","cherry1","lucky0","lucky1","1bar0","1bar1","2bar0","2bar1","3bar0","3bar1","blank"];for(var c in b){var d=b[c];a[d]=new PIXI.Texture.fromFrame(d+".png")}lucky7.symboTextures=a}function j(a,b){if("blank"===a)return void(this.textures=[lucky7.symboTextures.blank]);switch(this.textures=[lucky7.symboTextures[a+"0"],lucky7.symboTextures[a+"1"]],b){case"on":this.gotoAndStop(0);break;case"off":this.gotoAndStop(1);break;case"flash":this.gotoAndPlay(0)}}function k(){var a=new PIXI.Graphics;a.beginFill(0),a.drawRect(50,450,390,40),lucky7.stage.addChild(a),console.log(PIXI.BitmapText.fonts);var b=new PIXI.BitmapText("",{font:"28px LCD",align:"right"});b.x=100,b.y=461,b.mask=a;var c=new PIXI.BitmapText("",{font:"28px LCD",align:"right"});c.x=450,c.y=461,c.mask=a,lucky7.texts=[b,c],lucky7.stage.addChild(b),lucky7.stage.addChild(c)}function l(){lucky7.state="init",lucky7.balance=1e3;for(var a=["seven","seven","seven","lucky","lucky","lucky","cherry","cherry","cherry"],b=0;3>b;b++)for(var c=0;3>c;c++)j.call(lucky7.symbos[b][c],a[3*b+c],"on");for(b=0;3>b;b++)lucky7.reels[b].visible=!1;lucky7.texts[0].setText("TAP TO SPIN"),lucky7.texts[1].setText("TAP TO SPIN")}function m(){var a,b;for(lucky7.state="spinning",a=0;3>a;a++)lucky7.reels[a].visible=!0,lucky7.reels[a].gotoAndPlay(2*a);for(a=0;3>a;a++)lucky7.reels[a].visible=!0;if(lucky7.texts[0].x=180,lucky7.texts[0].setText("GOOD LUCK"),lucky7.texts[0].flashSpeed=.08,lucky7.texts[0].flash=0,lucky7.texts[1].x=530,lucky7.texts[1].setText("GOOD LUCK"),lucky7.texts[1].flashSpeed=.08,lucky7.texts[1].flash=0,lucky7.outcome){for(lucky7.audio.play("reels"),a=0;3>a;a++)for(b=0;3>b;b++){lucky7.symbos[a][b].visible=!1;var c=u[(lucky7.outcome.payline[b]-a+8)%7];j.call(lucky7.symbos[a][b],c,"on")}setTimeout(n,4e3)}else{for(a=0;3>a;a++)for(b=0;3>b;b++)lucky7.symbos[a][b].visible=!1;setTimeout(m,500)}}function n(){lucky7.audio.play("stop"),lucky7.state="stop1",console.log("stop1"),lucky7.reels[0].visible=!1;for(var a=0;3>a;a++)for(var b=0;3>b;b++)0===b&&(lucky7.symbos[a][b].visible=!0,lucky7.symbos[a][b].gotoAndStop(0));setTimeout(o,1e3)}function o(){lucky7.audio.play("stop"),lucky7.state="stop2",lucky7.reels[1].visible=!1;for(var a=0;3>a;a++)for(var b=0;3>b;b++)1===b&&(lucky7.symbos[a][b].visible=!0,lucky7.symbos[a][b].gotoAndStop(0));setTimeout(p,1e3)}function p(){lucky7.audio.play("stop"),lucky7.state="stop3",lucky7.reels[2].visible=!1;for(var a=0;3>a;a++)for(var b=0;3>b;b++)2===b&&(lucky7.symbos[a][b].visible=!0,lucky7.symbos[a][b].gotoAndStop(0));setTimeout(q,1e3)}function q(){lucky7.state="money";for(var a=0;3>a;a++)for(var b=0;3>b;b++)1===a&&0!==lucky7.outcome.win?lucky7.symbos[a][b].gotoAndPlay(1):lucky7.symbos[a][b].gotoAndStop(1);lucky7.texts[0].visible=!0,lucky7.texts[0].setText("WIN: "+lucky7.outcome.win),lucky7.texts[0].x=50,lucky7.texts[1].visible=!0,lucky7.texts[1].setText("BALANCE: "+lucky7.balance),lucky7.texts[1].x=200,lucky7.start=lucky7.balance,lucky7.end=lucky7.balance+lucky7.outcome.win,0===lucky7.outcome.win?setTimeout(r,500):(lucky7.audio.play("win"),console.log(lucky7.outcome.win),setTimeout(r,9e3))}function r(){lucky7.state="idle",lucky7.texts[0].visible=!0,lucky7.texts[1].visible=!0,lucky7.texts[0].x=100,lucky7.texts[1].x=450,lucky7.outcome.win<=100&&lucky7.outcome.win>0?(lucky7.texts[0].setText("SMALL WIN "+lucky7.outcome.win),lucky7.texts[1].setText("BALANCE "+lucky7.balance),lucky7.audio.play("smallWin")):lucky7.outcome.win>100?(lucky7.texts[0].setText("BIG WIN "+lucky7.outcome.win),lucky7.texts[1].setText("BALANCE "+lucky7.balance),lucky7.audio.play("bigWin")):(lucky7.texts[0].setText("NO MONEY"),lucky7.texts[1].setText("BALANCE "+lucky7.balance),lucky7.audio.play("noMoney"))}function s(){lucky7.outcome=null,lucky7.balance-=10,lucky7.balance=lucky7.balance<0?0:lucky7.balance,lucky7.outcome=cheet()}var t=(lucky7.input,lucky7.stage),u=["seven","lucky","cherry","3bar","2bar","1bar","blank"];h(),i(),b(),d(),e(),f(),k(),g(),l(),a()}function update(){function a(){h()}function b(){lucky7.texts[0].flash+=lucky7.texts[0].flashSpeed;var a=Math.floor(lucky7.texts[0].flash);lucky7.texts[0].visible=a%2===0}function c(){console.log("stop1"),b(1)}function d(){console.log("stop2"),b(2)}function e(){console.log("stop3"),b(3)}function f(){lucky7.balance=lucky7.balance+lucky7.outcome.win/500,lucky7.balance=lucky7.balance>lucky7.end?lucky7.end:lucky7.balance,lucky7.texts[1].setText("BALANCE: "+Math.floor(lucky7.balance)),console.log("money")}function g(){lucky7.balance=lucky7.end,h()}function h(){for(var a in lucky7.texts){var b=lucky7.texts[a];b.x=b.x-1,b.x<-200&&(b.x=500)}}switch(lucky7.state){case"init":a();break;case"spinning":b(0);break;case"stop1":c();break;case"stop2":d();break;case"stop3":e();break;case"money":f();break;case"idle":g();break;default:console.log("error")}}function cheet(){var a="larry",b=10,c=1,d=b*c,e=Math.floor(7*Math.random()),f=Math.floor(7*Math.random()),g=Math.floor(7*Math.random()),h=0;return(4===e||4===f||4===g)&&(h=Math.floor(2*d)),e>=1&&3>=e&&f>=1&&3>=f&&g>=1&&3>=g&&(h=Math.floor(3*d)),4===e&&4===f&&(h=Math.floor(10*d)),4===e&&4===g&&(h=Math.floor(10*d)),4===f&&4===g&&(h=Math.floor(10*d)),1===e&&1===f&&1===g&&(h=Math.floor(20*d)),2===e&&2===f&&2===g&&(h=Math.floor(50*d)),3===e&&3===f&&3===g&&(h=Math.floor(100*d)),4===e&&4===f&&4===g&&(h=Math.floor(150*d)),5===e&&5===f&&5===g&&(h=Math.floor(250*d)),6===e&&6===f&&6===g&&(h=Math.floor(1e3*d)),6===e&&6===f&&6===g&&3===c&&(h=Math.floor(5e3*d)),{id:a,win:h,coin:b,bet:c,cash:d,payline:[6-e,6-f,6-g]}}!function(){var a=/\s+/,b=Array.prototype.slice;Events={on:function(b,c,d){var e,f,g,h,i;if(!c)return this;for(b=b.split(a),e=this._callbacks||(this._callbacks={});f=b.shift();)i=e[f],g=i?i.tail:{},g.next=h={},g.context=d,g.callback=c,e[f]={tail:h,next:i?i.next:g};return this},off:function(b,c,d){var e,f,g,h,i,j;if(f=this._callbacks){if(!(b||c||d))return delete this._callbacks,this;for(b=b?b.split(a):_.keys(f);e=b.shift();)if(g=f[e],delete f[e],g&&(c||d))for(h=g.tail;(g=g.next)!==h;)i=g.callback,j=g.context,(c&&i!==c||d&&j!==d)&&this.on(e,i,j);return this}},trigger:function(c){var d,e,f,g,h,i,j;if(!(f=this._callbacks))return this;for(i=f.all,c=c.split(a),j=b.call(arguments,1);d=c.shift();){if(e=f[d])for(g=e.tail;(e=e.next)!==g;)e.callback.apply(e.context||this,j);if(e=i)for(g=e.tail,h=[d].concat(j);(e=e.next)!==g;)e.callback.apply(e.context||this,h)}return this}},window.Events=Events}(),function(){function a(a,c){this.el=a,this._data=c,this._loaded=!1,this.loaded=0,this._ph=b.onLoadProgress.bind(this),this.el.addEventListener("progress",this._ph,!1),this.el.addEventListener("canplaythrough",b.onLoad.bind(this),!1),this.el.addEventListener("play",b.onPlay.bind(this),!1),this.el.addEventListener("timeupdate",b.onProgress.bind(this),!1),this.el.addEventListener("pause",b.onStop.bind(this),!1),this.el.addEventListener("ended",b.onStop.bind(this),!1),this.el.addEventListener("loadstart",b.onStop.bind(this),!1)}var b={onLoad:function(){this._loaded=!0,this.el.removeEventListener("progress",this._ph,!1),this.trigger("onloaded")},onLoadProgress:function(){var a=0,c=1;try{a=this.el.buffered.end(0),c=this.el.duration}catch(d){}var e=~~(a/c*100);this.loaded=e,this.trigger("onload",e),100===this.loaded&&b.onLoad.call(this)},onProgress:function(){if(this._loaded&&(this.trigger("progress "+this._current+":progress",this.el.currentTime),this.el.currentTime>=this._end)){this.stop();var a=this._current;this._current=null,this.trigger("complete "+a+":complete")}},onPlay:function(){this.trigger("play "+this._current+":play"),b.onProgress.call(this)},onStop:function(){b.onProgress.call(this),this.trigger("stop "+this._current+":stop")},onError:function(){},onLoadStart:function(){this.trigger("loadstart")}};a.prototype={load:function(){return this.el.load(),this},get:function(a){return this._data[a]?this._data[a]:null},play:function(a){if(this.off("onloaded",this.play.bind(this,a)),this._loaded){var b=this.get(a);b&&(a!==this._current&&(this.el.currentTime=b.start),this._end=b.start+b.length,this._current=a,this.el.play())}else this.on("onloaded",this.play.bind(this,a)).load();return this},stop:function(){return this.off("onloaded",this.play),this._loaded&&this.el.pause(),this}};for(var c in window.Events)a.prototype[c]=window.Events[c];window.AudioSprite=a}();var spriteData={noMoney:{start:0,length:3},reels:{start:4.8,length:3.2},stop:{start:58,length:.3},win:{start:45,length:8},smallWin:{start:55,length:4.5},bigWin:{start:8,length:34}},CANDLE={kSpace:"kSpace",kTab:"kTab"};CANDLE.GAME=function(a,b,c){var d=this;PIXI.EventTarget.call(this),this.loader=a,this.setup=b,this.update=c,this.input=new CANDLE.INPUT,this.render=new CANDLE.RENDER(this.update,962,551),this.loader.load(),this.stage=this.render.stage,this.loader.addEventListener("onComplete",function(){d.setup(),d.render.play()})},CANDLE.INPUT=function(a,b){this.keys={},this.callbacks={},this.debug=b||!1,this.keyString=a||"",window.addEventListener("keydown",CANDLE.INPUT.prototype.keydown.bind(this)),window.addEventListener("keyup",CANDLE.INPUT.prototype.keyup.bind(this))},CANDLE.INPUT.prototype=function(){function a(a){var b=a.keyCode,c=CANDLE.INPUT.prototype.codeToChar(b);this.debug&&console.log(b,c),this.keys.hasOwnProperty(c)&&(a.preventDefault(),this.keys[c]="down",this.callbacks[c].call(this))}function b(a){var b=a.keyCode,c=String.fromCharCode(b);this.keys.hasOwnProperty(c)&&(a.preventDefault(),this.keys[c]="up")}function c(a){switch(a){case 9:return CANDLE.kTab;case 13:return CANDLE.kEnter;case 32:return CANDLE.kSpace;default:return String.fromCharCode(a)}}function d(a,b){this.keys.hasOwnProperty(a)||(this.keys[a]="up",this.callbacks[a]=b)}return{keydown:a,keyup:b,codeToChar:c,addKey:d}}(),CANDLE.RENDER=function(a,b,c){var d=this;this.render=a,this.width=b||1136,this.height=c||640,this.renderer=new PIXI.autoDetectRenderer(this.width,this.height),this.renderer.view.style.display="block",this.renderer.view.style.margin="auto",this.paused=!1,this.stage=new PIXI.Stage(15794175,!0),document.body.appendChild(this.renderer.view),CANDLE.RENDER.prototype.resize.call(this),$(window).resize(function(){CANDLE.RENDER.prototype.resize.call(d)}),window.addEventListener("touchmove",function(a){a.target.classList.contains("scrollable")||a.preventDefault()},!1)},CANDLE.RENDER.prototype=function(){function a(){var a=$(window).width(),b=$(window).height();b/a>640/1136?(this.renderer.view.style.width=$(window).width()+"px",this.renderer.view.style.height=$(window).width()/1136*640+"px"):(this.renderer.view.style.width=$(window).height()/640*1136+"px",this.renderer.view.style.height=$(window).height()+"px")}function b(){paused=!1,requestAnimFrame(d.bind(this))}function c(){paused=!0}function d(){paused||(this.render(),this.renderer.render(this.stage),requestAnimFrame(d.bind(this)))}return{resize:a,play:b,pause:c,animate:d}}(),CANDLE.LOADER=function(a,b){a=a||"images/";var c=_.map(b,function(b){return a+b})||[],d=new PIXI.AssetLoader(c);return d};var loader=new CANDLE.LOADER("images/",["atlas.json","lcd.xml"]),lucky7=new CANDLE.GAME(loader,setup,update);