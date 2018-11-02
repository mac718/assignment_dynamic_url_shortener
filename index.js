const express = require('express');
const app = express();
const redis = require('redis');
const redisClient = redis.createClient();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  redisClient.incr('visitor-count', (err, count) => {
    res.render('index', {count});
  })
})

app.listen(3000, 'localhost', () => {
  console.log('listening...')
})