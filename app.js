const express = require('express');
const app = express();
require('dotenv').config();

const port = 3000;


const handlebars = require("express-handlebars");
app.engine("handlebars",
    handlebars({
        defaultLayout: "main",
    })
);

app.set("view engine", "handlebars");

// Setup body-parser
app.use(express.urlencoded({extended:false}));

// Making the public folder available statically 

app.use(express.static(__dirname + '/public'));

// When navigating to "/", show the homepage.
// app.get("/", function (req, res) {


//     res.render("home");
// });

// Setup routes
app.use(require("./routes/application-routes"));


// Server setup
app.listen(port, () =>{
    console.log(`Express app listening on port ${port}`)
});