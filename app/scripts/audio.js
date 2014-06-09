var audioSprite = document.getElementById('audio');

// sprite data
var spriteData = {
  noMoney: {
    start: 0,
    length: 3
  },
  reels: {
    start: 4.8,
    length: 3.2
  },
  stop: {
    start: 60.2,
    length: 1
  },
  win: {
    start: 44,
    length: 9
  },
  smallWin: {
    start: 55,
    length: 5
  },
  bigWin: {
    start: 8,
    length: 34
  }
};

// current sprite being played
var currentSprite = {};

// time update handler to ensure we stop when a sprite is complete
var onTimeUpdate = function() {
  if (this.currentTime >= currentSprite.start + currentSprite.length) {
    this.pause();
  }
};
audioSprite.addEventListener('timeupdate', onTimeUpdate);

// load the audio file completely before doing this.
var playSprite = function(id) {
  if (spriteData[id] && spriteData[id].length) {
    currentSprite = spriteData[id];
    audioSprite.currentTime = currentSprite.start;
    audioSprite.play();
  }
};
