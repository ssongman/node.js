var express = require('express')
var http = require('http')
var app = express()
var server = http.createServer(app);

app.use('/static', express.static('static'));

app.get('/', function (req, res) {
  res.send('Hello \n /');
});

app.get('/world.html', function (req, res) {
  res.send('Hello World \n');
});

app.get('/image', function(req, res){
  res.send('static image test! <img src="/static/1.png">')
})

server.listen(3000, function() {
  console.log('Express server listening on port ' + server.address().port);
});

