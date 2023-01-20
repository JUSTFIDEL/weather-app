const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

let country = '';
let temp = '';
let desc = '';
let icon = '';
let imgURL = '';

    let appId = 'd73af229da4765abb090ad0caff333fa'
    let unit = 'metric';
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + country + '&appid=' + appId + '&units=' + unit; 
    
app.get('/', (req, res) => {
    
    res.render('list', {
        cityName: country,
        weatherTemp: temp,
        weatherDesc: desc,
        weatherIcon: icon,
        imgUrl: imgURL

    })
})

app.post('/', (req, res) => {

     country = req.body.cityName;


    
    https.get(url, (response) => {
        // console.log(response.statusCode);

        response.on('data', (data) => {
             weatherData = JSON.parse(data)
             temp = weatherData.main.temp
             desc = weatherData.weather[0].description
             icon = weatherData.weather[0].icon
             imgURL = 'http://openweathermap.org/img/wn/' + icon + '@4x.png'

            
        })
    })

})


app.get('/weather', (req, res) => {
    res.render('/weather')
})








app.listen(process.env.POST || 3000, () => {
    console.log('Server is running at Port 3000.');
})