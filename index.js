const express = require("express");
const port = "8000";
const app = express();

// using express router (middleware)
// we require only ./routers(folder) and it by default select the index.js file
app.use('/', require("./routers"));

app.listen(port , function(err){
    if(err){
        console.log(`error in connection : ${err}`);
        return;
    }

    console.log(`surver is running on port number: ${port}`);
})  