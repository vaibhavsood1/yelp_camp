var express = require("express");
var app  = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var mongoose = require("mongoose");
var passport = require("passport");
var user = require("./models/user.js");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var methodOverride = require('method-override');
var flash = require("connect-flash");
app.use(methodOverride('_method'));
app.use(flash());

mongoose.connect('mongodb://localhost/yelp_camp');
var Image  = require("./models/images.js");
var comment = require("./models/comments.js")
// var seed = require("./seeds.js");
// seed();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "Hello there",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
   next();
});


app.get("/",function(req,res){
    res.render("homepage.ejs");
});

app.get("/register",function(req, res) {
    res.render("register.ejs")
})
app.post("/register", function(req, res){
    user.register(new user({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register.ejs");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds");
        });
    });
});

app.get("/login",function(req, res) {
    res.render("login.ejs");
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){
});

app.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","Logged you Out!")
    res.redirect("/campgrounds");
});
app.get("/campgrounds",function(req,res){
 
   Image.find({},function(err,images){
       if(err){
           console.log(err);
       }
       else{
       res.render("campgrounds.ejs",{camps:images});
   }})
   function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error', "you need to login first!");
         res.redirect("/login");
    
    }
};

    
    
    
});
app.post("/campgrounds",isLoggedIn,function(req,res){
    var newcampgrounds  = {name: req.body.name,
        image : req.body.image,
        desc:req.body.desc,
        author:req.user,
        username:req.user.username
    };
    Image.create(newcampgrounds,function(err,camp){
        if(err){
            console.log("error!")
        }else{
            res.redirect("/campgrounds");
            
        }
    })    
   
    
});
app.get("/campgrounds/new",isLoggedIn,function(req, res) {
    res.render("newcampgrounds.ejs");
});

app.get("/campgrounds/:id",function(req, res) {
    Image.findById(req.params.id).populate('comments').exec(function(error, images) {
            res.render("show.ejs",{camp:images});
});


  
});
app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
    
    Image.findById(req.params.id,function(err,images){
        if(!err){
            res.render("comments/new.ejs",{camp:images});
        }
    });
    
});
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
    req.flash("error","You need to be loggedIn")
    res.redirect("/login");
}};
app.post("/campgrounds/:id/comments",function(req,res){
    
    
    Image.findById(req.params.id,function(err, images) {
        if(!err){
            
            comment.create(req.body.comment,function(err,comment){
                if(!err){
                    comment.author = req.user;
                    comment.username = req.user.username;
                    
                    
                    console.log(comment.username);
                    images.comments.push(comment);
                    comment.save();
                    images.save();
                    res.redirect("/campgrounds/" + req.params.id  );
                }
                
            })
            
        }
    });
    
});
app.get("/campgrounds/:id/edit",isLoggedIn,userMatch,function(req, res) {
        
        Image.findById(req.params.id,function(err, images) {
            if(!err){
                
                    res.render("edit.ejs",{camp:images});

            }
        })
});
app.post("/campgrounds/:id/edit",function(req, res) {
    Image.findByIdAndUpdate(req.params.id,req.body.campground,function(err,newCreated){
        if(!err){
            
            res.redirect("/campgrounds/"+ req.params.id);
            
        }
        
        
    });
    
    
    
});
app.delete("/campgrounds/:id",isLoggedIn,userMatch,function(req,res){
    Image.findByIdAndRemove(req.params.id,function(err){
        if(!err){
            res.redirect("/campgrounds");
        }
    })
})
function userMatch(req,res,next)
{
    Image.findById(req.params.id,function(err, images) {
        if(!err){
            if(images.username == req.user.username){
                
                return next();
            }else{
                req.flash("error","You dont have the permission!")
                res.redirect("back");
            }
            
        }
    })
    
    
}
function userMatchC(req,res,next)
{
    comment.findById(req.params.id,function(err, images) {
        if(!err){
            if(images.username == req.user.username){
                
                return next();
            }else{
                req.flash("error","You dont have the permission!")
                res.redirect("back");
            }
            
        }
    })
    
    
}
app.post("/campgrounds/comments/:id/edit",function(req, res) {
            comment.findByIdAndUpdate(req.params.id,req.body.comment,function(err,updatedComment){
                if(!err){
                    res.redirect("/campgrounds");
                }
            })
    
    
})
app.get("/campgrounds/comments/:id/edit",isLoggedIn,userMatchC,function(req, res) {
    comment.findById(req.params.id,function(err, comments) {
        if(!err){
                   res.render("comments/edit.ejs",{comment:comments}); 

        }
    })
    
});
app.delete("/campgrounds/comments/:id",isLoggedIn,userMatchC,function(req,res){
    comment.findByIdAndRemove(req.params.id,function(err){
        if(!err){
            res.redirect("back");
        }
    })
})
app.listen(process.env.PORT,process.env.IP);