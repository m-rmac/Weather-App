// // Required modules
const express = require("express");
const data = require("../modules/data");

// Express Router
const router = express.Router();

// Current location data storage

let currentHourly; 
let currentPt;
let currentLocation;


router.get("/",  async (req, res) => {

    // Renders home landing page
    res.render("home");

}); 



router.post("/weather", async (req, res)=>{

    // Retrieves Location Request 
    const location = req.body.location;

    // Stores Location
    currentLocation = location;

    // Retrieves Location Coordinates
    const locationCoordinates = data.retireveLocationCoordinates(location);
    console.log(locationCoordinates);


    try{

    // Uses cordinates to make API call and retrieve weather data
    const lat =  locationCoordinates.lat;
    const lon = locationCoordinates.lon;
    
    const locationForecast = await data.retrieveWeather(lat, lon);

    // Uses data to populate location summary card and weather table
    res.locals.location = location;

    res.locals.current = locationForecast.current;

    currentPt = locationForecast.current;

    let hourlyData = locationForecast.hourly;

    // Converts wind deg to cardinal directions for display
    currentHourly = hourlyData.filter(item => item.wind_deg = data.getCardinalDirection(item.wind_deg));
        
    res.locals.hourly = currentHourly;

    }catch(err){
        console.log(err);
    }


    res.render("weather");
});




router.post("/addConditionsFilter", (req, res) => {

    // Retrieve filter conditions
    const minKnots = req.body.rangeMin;
    const maxKnots = req.body.rangeMax;
    const direction = req.body.direction;

    // Update filter slider values
    res.locals.min = minKnots;
    res.locals.max = maxKnots;

    let conditionsFilter;

    let windDeg = currentHourly;

    // Set up wind filter
    windRange = function(item){
        
        return item.wind_speed < (maxKnots *0.51444444444444)&&
        item.wind_speed > (minKnots *0.51444444444444);
        
    }

    if(direction){

        // Add direction filter condition
        let windDegFilter = windDeg.filter(item => direction.includes(item.wind_deg));
        
        res.locals.directionFilter = direction;

        conditionsFilter = windDegFilter.filter(windRange);;

    }else{
        conditionsFilter = currentHourly.filter(windRange);
    }



    try{
        // Add Data to populate with matching results 
        res.locals.location = currentLocation;

        res.locals.current = currentPt;
        
        res.locals.hourly = conditionsFilter;
            

        }catch(err){
            console.log(err);
        }

    res.render("weather");
    

});

module.exports = router;