const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))



    
app.get('/', (req, res) => {
    
    res.render('list')
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
            
            res.render('weather', {
                cityName: country,
                weatherTemp: temp,
                weatherDesc: desc,
                weatherIcon: icon,
                imgUrl: imgURL
        
            })
        })
    })

})


app.get('/weather', (req, res) => {
    res.render('/weather')
})








app.listen(process.env.POST || 3000, () => {
    console.log('Server is running at Port 3000.');
})