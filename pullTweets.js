var TweetStreamToDb = require('./tweetStreamToDb.js');

var tweetStream = new TweetStreamToDb({
  twitterConf: {
    consumer_key: 'YOUR KEY HERE',
    consumer_secret: 'YOUR SECRET HERE',
    access_token_key: 'YOUR TOKEN KEY',
    access_token_secret: 'YOUR TOKEN SECRET' 
  },
  mongoConf: {
    url: 'FULL URL',
    db: 'DB NAME',
    collection: 'COLLECTION NAME'
  }
});

tweetStream.filter('kewords,separated,by,commas');

//Defaulting to listening for an hour
setTimeout(tweetStream.closeDb.bind(tweetStream), 1 * 60 * 60 * 1000);
