const User= require("../models/user");

module.exports.profile = function(req, res){

    // checking if the user_id is set in the cookie which we set during session cretaion
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id , function(err , user){
            // if(err){ console.log("error in finding the user"); return; }
            if(user){
                return res.render("user_profile" , {
                        title:"user",
                        user : user
                    })
            } else{
                return res.redirect("/users/signIn");
            }
        });

    } else
        return res.redirect("/users/signIn");

    // return res.render("user_profile" , {
    //     title:"user",
    //     userName: "username",
    //     userEmail : "email"
    // })
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

// module.exports.test = function(req, res){
    
// }

module.exports.createSession = function(req , res){
    // Authenticating the user manually
    // steps to authentications
    // find the user
    User.findOne({email:req.body.email} , function(err, user){
        if(err){
        console.log("error in finding the user");
        return;
        }
        
        // handle user found
        if(user){
            // handle password which do not match
            if(user.password != req.body.password){
            return res.redirect("back");
            } 
            // handle session creation
            res.cookie("user_id" , user.id);
            return res.redirect("/users/profile");
            
        } else{
            // handle user not found
            return res.redirect("back");
        }
    })
   
}