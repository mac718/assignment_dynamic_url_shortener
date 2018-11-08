const redis = require('redis');
const redisClient = redis.createClient();

const linkShortener = {
  linkShortener: (url) => {
    return new Promise(resolve => {
      let possibleChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let linkId = '';
      let shortenedLink = 'goo.gl/'
      for (var i = 0; i < 6; i++) {
        linkId += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length))
      }
      shortenedLink += linkId;
      redisClient.hmset('links', url, shortenedLink);
      redisClient.hmset('clicks', shortenedLink, 0);

      //redisClient.hmset('links', shortenedLink, url, `${shortenedLink}Clicks`, 0);
      redisClient.hgetall('links', (err, links) => {
        redisClient.hgetall('clicks', (err, clicks) => {
          resolve();
        })
      })
    })
  }

}

module.exports = linkShortener;