var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');


var router = require('express').Router();
var pg = require('pg');
var config ={
    database:'rho'
};


var pool = new pg.Pool(config);

// // var homeRouter = require('./routes/home');
// var favoritesRouter = require('./routes/favorites');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));



// // app.use('/home', homeRouter);
// app.use('/favorites',favoritesRouter);

app.post('/home', function(req, res){
    console.log(req.body);
    var gif = req.body.gif;
    var note = req.body.comment;

    pool.connect(function(err, client, done){
        if(err){
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }

        client.query('INSERT INTO favorites (gif,note) VALUES ($1, $2) returning *;', [gif,note],  function(err, result){
            done();
            if(err){
                console.log('Error connecting to the DB', err);
                res.sendStatus(500);
                return;
            }

        console.log('Got rows from the DB:',result.rows);
        res.send(result.rows);

        });
    });
});

app.get('/home', function(req, res){

    pool.connect(function(err, client, done){
        if(err){
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }

        client.query('SELECT * FROM favorites', function(err, result){
            done();
            if(err){
                console.log('Error querying the DB', err);
                res.sendStatus(500);

                return;
            }

        console.log('Got rows from the DB:',result.rows);
        res.send(result.rows);

        });

    });
});






app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port ', server.address().port);
});

module.exports = server;
