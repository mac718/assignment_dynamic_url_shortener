const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const redis = require('redis');
const redisClient = redis.createClient();
const linkShortener = require('./lib/link-shortener');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use('/socket.io', express.static(__dirname + 'node_modules/socket.io-client/dist/'));

app.use(express.static(`${__dirname}/public`))

app.use(bodyParser.urlencoded({ extended: true }))

//var clicks = 0;

io.on('connection', client => {
  console.log('new connection');

  

  client.on('shortened-link', (link) => {
    console.log('link ' + link)
    redisClient.hincrby('clicks', link, 1, (err, clicks) => {
      io.emit('new click', clicks);
    })
  })
})

app.get('/', (req, res) => {
  let result = ''
  let shortenedLinks;
  redisClient.hgetall('links', (err, links) =>{
    
    redisClient.hgetall('clicks', (err,clicks) => {
      //res.sendFile(__dirname + '/views/index.ejs', {headers: {'content-type': 'application/ejs'}});
      res.render('index', {links, clicks, result});
    })
  })
})

app.post('/shorten', (req, res) => {
  linkShortener.linkShortener(req.body.url)
    .then(() => {
      //res.redirect('back')
    })
})

server.listen(3000);