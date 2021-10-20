const express = require('express');
const https = require('https');
const app = express();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
    res.send('post is recived');
});

app.listen(3000);