const express = require("express");
const port = "8000";
// starting express server
const app = express();

// including express layout in the project
const expressLayouts = require("express-ejs-layouts");

// using express layout before routes because layouts should be ready before router caal the layouts 
app.use(expressLayouts);

// using express router (middleware)
// we require only ./routers(folder) and it by default select the index.js file
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