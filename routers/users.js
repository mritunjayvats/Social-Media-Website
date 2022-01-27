const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/user_controller");

router.get("/profile", passport.checkAuthentication , usersController.profile);

router.get("/signIn" , usersController.signIn);

router.get("/signUp" , usersController.signUp);

router.post("/create" , usersController.create);

//using passport as middleware to authenticate
router.post("/create-session" , passport.authenticate(
    "local" ,
    {failureRedirect : "/users/signIn"},
 ) ,usersController.createSession);

 

module.exports = router; 