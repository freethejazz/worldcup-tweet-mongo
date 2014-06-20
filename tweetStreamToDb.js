var twitter = require('twitter');
var MongoClient = require('mongodb').MongoClient;
var Q = require('Q');


/**
 * Takes a few configuration options and returns an object
 * that allows you to link the twitter streaming api to
 * MongoDb
 * 
 * @constructor
 * @param {object} options an options object
 * @param {object} options.twitterConf configuration obj to be passed to twitter
 * @param {object} options.mongoConf configuration object to be passed to the mongo driver
 */
var StreamToDb = function StreamToDb(options) {
  var readyDefer = new Q.defer();
  this._isReady = readyDefer.promise;
  this._options = options;
  this._complete = false;
  
  //Set up the twitter module
  this.twit = new twitter(options.twitterConf);

  //Set up a db connection
  MongoClient.connect(options.mongoConf.url + options.mongoConf.db, function(err, db) {
    if(err) throw err;
    var collection = db.collection(options.mongoConf.collection);

    this.db = db;
    this.collection = collection;

    readyDefer.resolve();
  }.bind(this));
};

StreamToDb.prototype.filter = function(keywords) {
  if(!this.db) {
    return this._isReady.then(function() {this.filter(keywords);}.bind(this));
  }

  this.twit.stream('filter', {track: keywords}, function(stream) {
    var collection = this.collection;
    this.currentStream = stream;

    stream.on('data', function(data) {
      collection.insert(data, {safe:false});
    });

  }.bind(this));

};

StreamToDb.prototype.stopStream = function() {
  this.currentStream.destroy();
};

StreamToDb.prototype.closeDb = function() {
  this.currentStream.destroy();
  this.db.close();
};

module.exports = StreamToDb;
