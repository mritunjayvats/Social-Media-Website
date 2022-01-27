const express = require("express");

// including cookie parser module to read and write from the cookie
const cookieParser = require("cookie-parser");
// starting express server
const app = express();

const port = 8000;

// including express layout in the project
const expressLayouts = require("express-ejs-layouts");

// requiring the mondo db confir file from config folder
const db = require("./config/mongoose");

// install and require express session
const session = require("express-session");

const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

// including mongo connect to save the sesison key into the mongo db
// const MongoStore = require('connect-mongo')(session);

// including cookie parser module to read and write from the cookie
// const cookieParser = require("cookie-parser");
// const { cookie } = require("express/lib/response");

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

// setting up ejs as my view engine
app.set("view engine" , "ejs");
app.set("views" , "./views");

// mongo store is used to store the session cookie in the db
// handle session creation
// GOOGLE it
app.use(session({
   name:"code_dev",
//    change the secret before deployemnet in production mode
   secret: "secretKey",
   saveUninitialized:false,
   resave:false,
   cookie:{
       maxAge:(1000 * 60 *100)
   } ,
//    store: new MongoStore(
//     {
//         mongooseConnection: db,
//         autoRemove: 'disabled'
    
//     },
//     function(err){
//         console.log(err ||  'connect-mongodb setup ok');
//     }
// )
})); 

app.use(passport.initialize());
app.use(passport.session());

// using setAuthenticatedUser custom middleware form pasport-local-strategy file
app.use(passport.setAuthenticatedUser);

// we can write app.use('/', require("./routers/index"));
app.use('/', require("./routers"));

app.listen(port , function(err){
    if(err){
        // showing error message
        console.log(`error in connection : ${err}`);
        return;
    }

    console.log(`surver is running on port number: ${port}`);
})  