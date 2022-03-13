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


res.render("home");

}); 



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

    let test = locationForecast.hourly;

    currentHourly = test.filter(item => item.wind_deg = data.getCardinalDirection(item.wind_deg));
        // console.log(currentHourly);
        res.locals.hourly = currentHourly;

    }catch(err){
        console.log(err);
    }


    res.render("weather");
});


// Add filter 

router.post("/addConditionsFilter", (req, res) => {

const minKnots = req.body.rangeMin;
const maxKnots = req.body.rangeMax;
// console.log(minKnots);

let conditionsFilter;

const direction = req.body.direction;

let windDeg = currentHourly;
// .filter(item => item.wind_deg = data.getCardinalDirection(item.wind_deg));
// console.log(textConvert);


maxWind = function(item){
    
    return item.wind_speed < (maxKnots *0.51444444444444)&&
    item.wind_speed > (minKnots *0.51444444444444);
    
}

if(direction){

let windDegFilter = windDeg.filter(item => direction.includes(item.wind_deg));

let windFilter = windDegFilter.filter(maxWind);
// console.log(filter1);

conditionsFilter = windFilter;

// console.log(windFilter);
}else{conditionsFilter = currentHourly.filter(maxWind);}



// Add Data

try{


    res.locals.location = currentLocation;

    res.locals.current = currentPt;
    // console.log(currentLocation);


    res.locals.hourly = conditionsFilter;
    // console.log(filterHourly);

    }catch(err){
        console.log(err);
    }

// console.log(current);
res.render("weather");
// res.redirect("/weather");



});

module.exports = router;