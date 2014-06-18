var twitter = require('twitter');
var MongoClient = require('mongodb').MongoClient;

var config = require('./config.js');

var twit = new twitter({
    consumer_key: config.cKey,
    consumer_secret: config.cSecret,
    access_token_key: config.tKey,
    access_token_secret: config.tSecret 
});

MongoClient.connect('mongodb://127.0.0.1:27017/worldcup', function(err, db) {
  if(err) throw err;
  var collection = db.collection('tweets');

  twit.stream('filter', {track: config.keywords || 'worldcup,fifa'}, function(stream) {
    stream.on('data', function(data) {
      collection.insert(data, {safe:false});
    });
    setTimeout(function() {
      stream.destroy();
      db.close();
    }, config.timeout || 50000);
  });
});
