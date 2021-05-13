const express = require('express')
const app = express()
const https = require('https')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))



app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

app.post('/', function(req, res) {
    const query = req.body.CityName;
    const apikey = "938d2c347847ae6b56aeabdfb3f6ee9c"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apikey +"&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        
    
        response.on('data', function (data){
            console.log(data); /*here the data is in the form of hexadecimal, so we have to convert it into JSON*/
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp
            const weatherdescriptions = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon
            const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`
                
                // res.write(`<p>The weather Description is ${weatherdescriptions}</p>`);
                // res.write(`<h1>The temprature in ${query} is ${temp} degree celcius.</h1>`);  /*we can only have one send here beacause its mean end, so we use res.write*/
                // res.write(`<img src=${imageURL}>`)
                // res.send()
                res.render("detail",
                {Desc: weatherdescriptions,City: query, temprature: temp , img: imageURL});
        })
    })    
})




app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running on port 3000");
})