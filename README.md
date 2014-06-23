## World Cup Tweet Stream
Pulls tweets from the stream matching 'worldcup' or 'fifa', and inserts them into
a local mongodb instance


###Prerequisites
* Have mongodb installed and running on your local machine
* Have a twitter dev account and application

###Usage

```
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
```

Then simply call the `filter` method on the instantiated `TweetStreamToDb`,
passing a string of comma separated keywords to field by.

```
tweetStream.filter('fifa,worldcup');
```

When you're done listening, call `stopStream` to close the stream,
but leave the db open. If you're done with everything, call
`closeDb`.
