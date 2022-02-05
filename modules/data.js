
const fetch = require("node-fetch");

async function retrieveWeather(lat, lon){

    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.API_KEY}`;
    
    try{

    let weatherRetrieve = await fetch(url);

    let weatherData = await weatherRetrieve.json();

    // console.log(weatherData);

    // extractData(weatherData);

    return weatherData;

    } catch (error) {
        console.log(error);
    }

}

function extractData(data){

    // document.querySelector("#test").innerHTML = `${data.timezone}`;

    console.log(data.timezone);

    return data.timezone;
}


module.exports = {
    retrieveWeather,
    extractData};