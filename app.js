const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
    
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {

    const country = req.body.cityName;
    const appId = 'd73af229da4765abb090ad0caff333fa'
    const unit = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + country + '&appid=' + appId + '&units=' + unit; 
    
    https.get(url, (response) => {
        // console.log(response.statusCode);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgURL = 'http://openweathermap.org/img/wn/' + icon + '@4x.png'

            res.write("<p>The weather is currently " + desc + "</p>");
            res.write("<h1>The Temparature in " + country + " is " + temp + " degrees Celsius </h1>");
            res.write("<img src=" + imgURL + ">")
            res.send()
            
        })
    })

})









app.listen('3000', () => {
    console.log('Server is running at Port 3000.');
})