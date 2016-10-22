var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');


var gifsRouter = require('./routes/gifs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/gifs',gifsRouter);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port ', server.address().port);
});

module.exports = server;
