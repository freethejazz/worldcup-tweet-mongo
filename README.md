## World Cup Tweet Stream
Pulls tweets from the stream matching 'worldcup' or 'fifa', and inserts them into
a local mongodb instance


###Prerequisites
* Have mongodb installed and running on your local machine
* Have a twitter dev account and application
* create a file in the root directory that looks something like:

```
module.exports = {
  cKey: 'YOUR CONSUMER KEY',
  cSecret: 'YOUR CONSUMER SECRET',
  tKey: 'YOUR TOKEN KEY',
  tSecret: 'YOUR TOKEN SECRET'
};
```

###Running it
`node pullTweets.js` will start the application and will pull from the
streaming API for 50 seconds.

###Modifying

*Stream Filtering*
Add a `keywords` property to your config exports object and set it to a comma separated
string of keywords to look for in the twitter stream.

*Length of Time*
Add a `timeout` property to your config exports object and set it to a number representing the ms length of time you want the stream connection to be open.
