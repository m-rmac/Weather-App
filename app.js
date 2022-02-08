const express = require('express');
const app = express();
require('dotenv').config();

const port = 3000;


const handlebars = require("express-handlebars");
app.engine("handlebars",
    handlebars({
        defaultLayout: "main",
        helpers:{
            unixConvert: (unix) => new Date(unix*1000).toLocaleTimeString("en-NZ", { timeZone: 'Pacific/Auckland' })
        }
    })
);


app.set("view engine", "handlebars");


// register new function

// handlebars.registerHelper('unixConvert', function (unix) {
//     var time = new Date(unix*1000).toLocaleTimeString("en-NZ", { timeZone: 'Pacific/Auckland' });
    
//     return time;
// });



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