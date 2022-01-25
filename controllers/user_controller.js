const User= require("../models/user");

module.exports.profile = function(req, res){
    return res.render("user_profile" , {
        title:"user"
    })
}

module.exports.signIn = function(req, res){
    return res.render("user_sign_in", {
        title:"signIn"
    });
}

module.exports.signUp = function(req, res){
    return res.render("user_sign_up", {
        title:"signUp"
    });
}

module.exports.create = function(req , res){
    if(req.body.password != req.body.confirm_password){
        console.log("passwod not matched");
        return res.redirect('back');
    }

    User.findOne({email: req.body.email} , function(err , user){
        if(err){ console.log("error in finding the user"); return; }

        if(!user){
            User.create(req.body , function(err , user){
                if(err){ console.log("error in creating the new user"); return; }
                
                return res.redirect("/users/signIn");
            })
        } else{
            return res.redirect("back");
        }    
        
    });
     
}

module.exports.createSession = function(req , res){
    // To do later ..
}