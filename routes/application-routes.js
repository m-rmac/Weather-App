// // Required modules
const express = require("express");
const data = require("../modules/data");

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
    console.log(test);
    res.locals.location = test.timezone;

    let dateTest = data.unixDateExtraction(test.current.dt);
    console.log(dateTest);

    res.locals.hourly = test.hourly;

    res.render("weatherDisplay");

});




module.exports = router;