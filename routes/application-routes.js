// // Required modules
const express = require("express");
const data = require("../modules/data");

// Express Router
const router = express.Router();

const fs = require('fs');


// const apiKey = process.env.API_KEY;

// Home 

router.get("/",  async (req, res) => {

    let test = await data.retrieveWeather(-36.848516, 174.856328);
    console.log(test);

    let sunrise = test.timezone;

    res.locals.weatherData = sunrise;

res.render("home");

}); 



module.exports = router;