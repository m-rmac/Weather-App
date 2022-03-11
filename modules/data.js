
const fetch = require("node-fetch");

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

function extractData(data){

    // document.querySelector("#test").innerHTML = `${data.timezone}`;

    // console.log(data.timezone);

    return data.timezone;
}

function arrayExtractor(array){

    let list=" ";

        for (let i = 0; i < array.length; i++) {
            list += getCardinalDirection(array[1].wind_deg);

            // for(var property in weather) {
            //     alert(property + "=" + weather[property]);
            // }

            if(i>= (array.length - 1)){
                list +=".";
            }else{
                list +=", ";
            }
        }

        return list;
        // console.log(list);
        
        // let weatherList = array.weather;

        // for(var property in weatherList) {
        //     // alert(property + "=" + weatherList[property]);
        //     console.log(weatherList[property]);
        // }


}

function unixDateExtraction(unix){
    // var date = new Date(unix*1000).toLocaleDateString("en-US");
    var time = new Date(unix*1000).toLocaleTimeString("en-NZ", { timeZone: 'Pacific/Auckland' });
    
    return time;
    
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




module.exports.register = function (Handlebars, options)  { 
    Handlebars.registerHelper('foo', function (str)  { 
      return  str;
    });
  };


module.exports = {
    retrieveWeather,
    extractData,
    arrayExtractor,
    unixDateExtraction,
    degToCompass,
    getCardinalDirection
};