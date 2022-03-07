// // Required modules
const express = require("express");
const data = require("../modules/data");
const locationData = require("../modules/locations-dao");
// const onPage = require("../modules/onPage");

// Express Router
const router = express.Router();

const fs = require('fs');
const res = require("express/lib/response");
const { dir } = require("console");

// Current location data 

let currentHourly; 
let currentPt;
let currentLocation;


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
    currentLocation = location;

    // Retrieve Coordinates from Database and Populate table

    try{

    const lat =  await locationData.retrieveLat(location);
    const lon = await locationData.retrieveLon(location);
    
    const locationForecast = await data.retrieveWeather(lat.lat, lon.lon);
    // console.log(locationForecast);

    res.locals.location = location;

    res.locals.current = locationForecast.current;

    currentPt = locationForecast.current;

    res.locals.hourly = locationForecast.hourly;

    currentHourly = locationForecast.hourly;
        // console.log(locationForecast.hourly);

    }catch(err){
        console.log(err);
    }


    res.render("weatherDisplay");
});


// Add filter 

router.post("/addConditionsFilter", (req, res) => {

const minKnots = req.body.rangeMin;
const maxKnots = req.body.rangeMax;
console.log(minKnots);

const direction = req.body.direction;


maxWind = function(item){
    
    return item.wind_speed < (maxKnots *0.51444444444444)&&
    item.wind_speed > (minKnots *0.51444444444444);
    
}

filter1 = currentHourly.filter(maxWind);

direction_filter = function(item){
    let conversion = data.getCardinalDirection(item); 
    if(direction){
        for (let i = 0; i < direction.length; i++) {
            const e = direction[i];
            
            
        }
    }
}

// Add Data

try{


    res.locals.location = currentLocation;

    res.locals.current = currentPt;
    console.log(currentLocation);


    res.locals.hourly = filter1;
    // console.log(filterHourly);

    }catch(err){
        console.log(err);
    }

// console.log(current);

res.render("weatherDisplay");



});

module.exports = router;