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

router.get("/weather", async (req, res) => {

    let test = await data.retrieveWeather(-36.848516, 174.856328);
    // console.log(test);
    res.locals.location = test.timezone;

    let dateTest = data.unixDateExtraction(test.current.dt);
    console.log(dateTest);

    res.locals.hourly = test.hourly;

    res.render("weatherDisplay");

});

router.post("/weather", async (req, res)=>{

    // Retrieves Location Request 

    const location = req.body.location;

    // Retrieve Coordinates from Database and Populate table

    try{

    const lat =  await locationData.retrieveLat(location);
    const lon = await locationData.retrieveLon(location);
    console.log(lat);

    const locationForecast = await data.retrieveWeather(-36.815197, 174.767506);
    // console.log(locationForecast);

    res.locals.location = locationForecast.timezone;

    // let dateTest = data.unixDateExtraction(locationForecast.current.dt);
    // console.log(dateTest);

    res.locals.hourly = locationForecast.hourly;

    // console.log(locationForecast.hourly);

    }catch(err){
        console.log(err);
    }

    // let test = await data.retrieveWeather(-36.848516, 174.856328);
    // console.log(test);
    // res.locals.location = locationForecast.timezone;

    // let dateTest = data.unixDateExtraction(locationForecast.current.dt);
    // console.log(dateTest);

    // res.locals.hourly = locationForecast.hourly;

    // const lat =  await locationData.retrieveLat("Muriwai");
    // const lon = await locationData.retrieveLon("Muriwai");
    // console.log(lat, lon);


    res.render("weatherDisplay");
});




module.exports = router;