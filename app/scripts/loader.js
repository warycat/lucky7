CANDLE.LOADER = function(prefix,files){
  prefix = prefix || '/images/';
  var assetsURLs = _.map(files, function(file){return prefix + file;}) || [];
  var loader = new PIXI.AssetLoader(assetsURLs);
  return loader;
};
