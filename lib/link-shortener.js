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
      resolve();
    })
  }

}

module.exports = linkShortener;