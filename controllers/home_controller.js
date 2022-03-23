const Post = require('../models/post');

module.exports.home = function(req , res){
    // console.log(req.cookies);
    // res.cookie("user", 25);
    // Post.find({} , function(err , posts){
    //    return res.render("home" , {
    //     title: "Home",
    //     posts : posts
    //    });
    // });
    
    Post.find({}).populate('user').exec(function(err , posts){
        return res.render("home" , {
            title: "Home",
            posts : posts
        });
    });

}