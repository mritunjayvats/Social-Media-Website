const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/code_dev_env");

const db = mongoose.connection;

db.on("error" , console.error.bind(console , "error"));

db.once('open', function(){
    console.log("connected to the database mongoDB");
})

module.exports = db;