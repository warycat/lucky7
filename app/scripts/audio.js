(function () {

  var eventSplitter = /\s+/;
  var slice = Array.prototype.slice;

  Events = {
    on: function (events, callback, context) {
      var calls, event, node, tail, list;
      if (!callback) {
        return this;
      }
      events = events.split(eventSplitter);
      calls = this._callbacks || (this._callbacks = {});

      // Create an immutable callback list, allowing traversal during
      // modification.  The tail is an empty object that will always be used
      // as the next node.
      while (event = events.shift()) {
        list = calls[event];
        node = list ? list.tail : {};
        node.next = tail = {};
        node.context = context;
        node.callback = callback;
        calls[event] = {
          tail: tail,
          next: list ? list.next : node
        };
      }

      return this;
    },

    off: function (events, callback, context) {
      var event, calls, node, tail, cb, ctx;

      // No events, or removing *all* events.
      if (!(calls = this._callbacks)) return;
      if (!(events || callback || context)) {
        delete this._callbacks;
        return this;
      }

      // Loop through the listed events and contexts, splicing them out of the
      // linked list of callbacks if appropriate.
      events = events ? events.split(eventSplitter) : _.keys(calls);
      while (event = events.shift()) {
        node = calls[event];
        delete calls[event];
        if (!node || !(callback || context)) continue;
        // Create a new list, omitting the indicated callbacks.
        tail = node.tail;
        while ((node = node.next) !== tail) {
          cb = node.callback;
          ctx = node.context;
          if ((callback && cb !== callback) || (context && ctx !== context)) {
            this.on(event, cb, ctx);
          }
        }
      }

      return this;
    },

    trigger: function (events) {
      var event, node, calls, tail, args, all, rest;
      if (!(calls = this._callbacks)) return this;
      all = calls.all;
      events = events.split(eventSplitter);
      rest = slice.call(arguments, 1);

      // For each event, walk through the linked list of callbacks twice,
      // first to trigger the event, then to trigger any `"all"` callbacks.
      while (event = events.shift()) {
        if (node = calls[event]) {
          tail = node.tail;
          while ((node = node.next) !== tail) {
            node.callback.apply(node.context || this, rest);
          }
        }
        if (node = all) {
          tail = node.tail;
          args = [event].concat(rest);
          while ((node = node.next) !== tail) {
            node.callback.apply(node.context || this, args);
          }
        }
      }

      return this;
    }
  };

  window.Events = Events;

}());

(function () {

  var _events = {

    /**
     * On audio file load
     */
    onLoad: function () {
      this._loaded = true;
      this.el.removeEventListener('progress', this._ph, false);
      this.trigger('onloaded');
    },

    /**
     * On buffer
     */
    onLoadProgress: function () {
      var loaded = 0;
      var duration = 1;

      try {
        loaded = this.el.buffered.end(0);
        duration = this.el.duration;
      } catch (e) {}

      // round percent
      var percent = ~~ ((loaded / duration) * 100);

      this.loaded = percent;
      this.trigger('onload', percent);
      if (this.loaded === 100) {
        _events.onLoad.call(this);
      }
    },

    /**
     * On progress
     */
    onProgress: function () {
      if (!this._loaded) {
        return;
      }

      this.trigger('progress ' + this._current + ':progress', this.el.currentTime);
      if (this.el.currentTime >= this._end) {
        this.stop();
        var current = this._current;
        this._current = null;
        this.trigger('complete ' + current + ':complete');
      }
    },

    /**
     * on audio play
     */
    onPlay: function () {
      this.trigger('play ' + this._current + ':play');
      _events.onProgress.call(this);
    },

    /**
     * on audio stop
     */
    onStop: function () {
      _events.onProgress.call(this);
      this.trigger('stop ' + this._current + ':stop');
    },

    /**
     * on audio error
     */
    onError: function (a) {

    },

    /**
     * on load start
     */
    onLoadStart: function () {
      this.trigger('loadstart');
    }
  };

  /**
   * Audio Sprite Object
   * @param {DOM Element} audioEl
   * @param {array} spriteData
   */
  function AudioSprite(audioEl, spriteData) {
    this.el = audioEl;
    this._data = spriteData;
    this._loaded = false;
    this.loaded = 0;

    this._ph = _events.onLoadProgress.bind(this);
           // this.el.addEventListener('loadstart', _events.onLoadStart.bind(this), false);
    this.el.addEventListener('progress', this._ph, false);
    this.el.addEventListener('canplaythrough', _events.onLoad.bind(this), false);
    this.el.addEventListener('play', _events.onPlay.bind(this), false);
    this.el.addEventListener('timeupdate', _events.onProgress.bind(this), false);
    this.el.addEventListener('pause', _events.onStop.bind(this), false);
    this.el.addEventListener('ended', _events.onStop.bind(this), false);
    this.el.addEventListener('loadstart', _events.onStop.bind(this), false);
  }

  // Prototype
  AudioSprite.prototype = {

    /**
     * Load audio file
     * @return {this}
     */
    load: function () {
      this.el.load();
      return this;
    },

    /**
     * Get Sprite data
     * @param {string} id
     * @return {object}
     */
    get: function (id) {
      return this._data[id] ? this._data[id] : null;
    },

    /**
     * Play sprite
     * @param {string} id
     * @return {this}
     */
    play: function (id) {
      this.off('onloaded', this.play.bind(this, id));
      if (this._loaded) {

        // If no id is present, get current sprite.
        // id || (id = this._current);

        var sprite = this.get(id);
        if (sprite) {
          if (id !== this._current) {
            this.el.currentTime = sprite.start;
          }
          this._end = sprite.start + sprite.length;
          this._current = id;
          this.el.play();
        }
      } else {
        this
          .on('onloaded', this.play.bind(this, id))
          .load();
      }
      return this;
    },

    /**
     * Stop audio
     * @return {this}
     */
    stop: function () {
      this.off('onloaded', this.play);
      if (this._loaded) {
        this.el.pause();
      }
      return this;
    }
  };

  // Add event methods
  for (var name in window.Events) {
    AudioSprite.prototype[name] = window.Events[name];
  }

  window.AudioSprite = AudioSprite;

}());


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
    start: 58,
    length: 0.3
  },
  win: {
    start: 45,
    length: 8
  },
  smallWin: {
    start: 55,
    length: 4.5
  },
  bigWin: {
    start: 8,
    length: 34
  }
};