const express = require('express');
const app = express();
require('dotenv').config();

const port = 3000;


const handlebars = require("express-handlebars");
app.engine("handlebars",
    handlebars({
        defaultLayout: "main",
        helpers:{
            unixTime: (unix) => new Date(unix*1000).toLocaleTimeString("en-NZ", { timeZone: 'Pacific/Auckland' }),
            unixDate: (unix) => new Date(unix*1000).toLocaleDateString("en-NZ", { timeZone: 'Pacific/Auckland' }),
            getCardinalDirections: (angle) => {const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
            return directions[Math.round(angle / 45) % 8]}
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