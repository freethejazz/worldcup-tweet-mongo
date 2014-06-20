var TweetStreamToDb = require('./tweetStreamToDb.js');
var config = require('./config.js');

var tweetStream = new TweetStreamToDb({
  twitterConf: {
    consumer_key: config.cKey,
    consumer_secret: config.cSecret,
    access_token_key: config.tKey,
    access_token_secret: config.tSecret 
  },
  mongoConf: {
    url: 'mongodb://127.0.0.1:27017/',
    db: 'worldcup',
    collection: 'tweets'
  }
});

tweetStream.filter(config.keywords);

setTimeout(tweetStream.closeDb.bind(tweetStream), 20 * 1000);
