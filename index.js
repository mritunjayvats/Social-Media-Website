const express = require("express");
const port = "8000";
// starting express server
const app = express();

// including express layout in the project
const expressLayouts = require("express-ejs-layouts");

// requiring the mondo db confir file from config folder
const db = require("./config/mongoose");

// including cookie parser module to read and write from the cookie
const cookieParser = require("cookie-parser");

// getting the result from the post request
app.use(express.urlencoded());

// using cookieParser as a middleware 
app.use(cookieParser());

// using express.static to access static file stored in the assets diractory
app.use(express.static("./assets"));

// using express layout before routes because layouts should be ready before router caal the layouts 
app.use(expressLayouts);

// extracting the css and js file from the body tag
app.set("layout extractStyles" , true);
app.set("layout extractScripts" , true);

// using express router (middleware)
// we require only ./routers(folder) and it by default select the index.js file
// we can write app.use('/', require("./routers/index"));
app.use('/', require("./routers"));

// setting up ejs as my view engine
app.set("view engine" , "ejs");
app.set("views" , "./views");

app.listen(port , function(err){
    if(err){
        // showing error message
        console.log(`error in connection : ${err}`);
        return;
    }

    console.log(`surver is running on port number: ${port}`);
})  