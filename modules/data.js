
const fetch = require("node-fetch");
const locationData = require("../public/locationData");


async function retrieveWeather(lat, lon){

    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.API_KEY}&units=metric`;
    
    try{

    let weatherRetrieve = await fetch(url);

    let weatherData = await weatherRetrieve.json();

    return weatherData;

    } catch (error) {
        console.log(error);
    }

}

function retireveLocationCoordinates(locationValue){

    let locationJSON = locationData[locationValue];

    return locationJSON;

}


function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

function getCardinalDirection(angle) {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    return directions[Math.round(angle / 45) % 8];
}



module.exports = {
    retrieveWeather,
    degToCompass,
    getCardinalDirection,
    retireveLocationCoordinates
};