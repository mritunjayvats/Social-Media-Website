const express = require("express");
const router = express.Router();

// requiring the home_controller.js file from controller to get all the actions(functions) in it
const homeController = require("../controllers/home_controller");
// checking if router is loaded or not
// NOTE:- router is loaded(message on console) is appearing first on console beacuse this file is used as a middleware
// console.log("router is loaded");

// using home action from home controller
router.get('/', homeController.home);

// now every route starting with /user will be directed toward users.js router
router.use("/users" , require("./users"));

router.use("/posts" , require('./posts'));

module.exports = router;