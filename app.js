const express = require('express');
const app = express();
require('dotenv').config();

const port = (process.env.PORT || 3000);


const handlebars = require("express-handlebars");
app.engine("handlebars",
    handlebars({
        defaultLayout: "main",
        helpers:{
            unixTime: (unix) => new Date(unix*1000).toLocaleTimeString("en-NZ", { timeZone: 'Pacific/Auckland', hour: 'numeric'}),
            unixDate: (unix) => new Date(unix*1000).toLocaleDateString("en-NZ", { timeZone: 'Pacific/Auckland', day: 'numeric', month: 'numeric' }),
            unixDay: (unix) => { const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayNumber = new Date(unix*1000).getDay("en-NZ", { timeZone: 'Pacific/Auckland' });
            return days[dayNumber]},
            getCardinalDirections: (angle) => {const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
            return directions[Math.round(angle / 45) % 8]},
            dateFormat: (unix) => { var date = new Date(unix*1000).toLocaleString("en-NZ", {timeZone: 'Pacific/Auckland', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'} );
                return date},
            knots: (wind) => (wind/0.51444444444444).toFixed(1),
            onedp: (number)=> number.toFixed(1),
            ifIn: (array, item) => {

                if(! Array.isArray(array)){
                    array = [array];
                }

                var found = false;
                    for(var i = 0; i < array.length; i++) {
                        if (array[i] == item) {
                            found = true;
                            return "checked";
                        }
                    }
                }
        }
    })
);



app.set("view engine", "handlebars");


// Setup body-parser
app.use(express.urlencoded({extended:false}));

// Making the public folder available statically 

app.use(express.static(__dirname + '/public'));


// Setup routes
app.use(require("./routes/application-routes"));


// Server setup
app.listen(port, () =>{
    console.log(`Express app listening on port ${port}`)
});