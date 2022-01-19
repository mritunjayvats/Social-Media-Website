const express = require("express");
const port = "8000";
const app = express();

app.listen(port , function(err){
    if(err){
        console.log(`error in connection : ${err}`);
        return;
    }

    console.log(`surver is running on port number: ${port}`);
}) 