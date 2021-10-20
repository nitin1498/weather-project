const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
    const cityName = req.body.cityName;
    const unit = 'metric';
    const apiKey = ''
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
    https.get(url, function(responce) {
        responce.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png';
            const city = weatherData.name;
            res.write(`<p>Weather is currently ${weatherDesc} </p>`);
            res.write(`<h1>The temperature in ${city} is ${temp} is degree Celcius.</h1>`);
            res.write('<img style="background-color : grey;" src="' + icon + '">')
            res.send();
        });
    });
});

app.listen(3000);