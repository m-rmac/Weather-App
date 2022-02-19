// // Required modules
const express = require("express");
const data = require("../modules/data");
const locationData = require("../modules/locations-dao");

// Express Router
const router = express.Router();

const fs = require('fs');


// Home 

router.get("/",  async (req, res) => {

    let test = await data.retrieveWeather(-36.848516, 174.856328);
    // console.log(test);

    let sunrise = test.timezone;

    

    res.locals.weatherData = sunrise;

res.render("home");

}); 

// router.get("/weather", async (req, res) => {

//     res.locals.location = test.timezone;

//     let dateTest = data.unixDateExtraction(test.current.dt);
//     console.log(dateTest);

//     res.locals.hourly = test.hourly;

//     res.render("weatherDisplay");

// });

router.post("/weather", async (req, res)=>{

    // Retrieves Location Request 

    const location = req.body.location;


    // Retrieve Coordinates from Database and Populate table

    try{

    const lat =  await locationData.retrieveLat(location);
    const lon = await locationData.retrieveLon(location);
    
    const locationForecast = await data.retrieveWeather(lat.lat, lon.lon);
    // console.log(locationForecast);

    res.locals.location = location;

    res.locals.current = locationForecast.current;

    const testArray = locationForecast.current.weather;
    // console.log(testArray);

    res.locals.hourly = locationForecast.hourly;

    // let weatherArray = data.arrayExtractor(locationForecast.hourly);
    // console.log(weatherArray);

    // console.log(locationForecast.hourly.weather);

    }catch(err){
        console.log(err);
    }


    res.render("weatherDisplay");
});




module.exports = router;