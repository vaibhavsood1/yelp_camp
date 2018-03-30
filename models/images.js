var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/yelp_camp');
var comment  = require("../models/comments.js");
var user = require("../models/user.js");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
// var comment = require("./models/comments.js"); 
var yelpImage= new Schema({
    
    name: String,
    image: String,
    desc : String,
    comments : [{ 
        type: Schema.Types.ObjectId, ref: "comment" 
        
    }],
    
    author: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    username : String
    
        
});

module.exports = mongoose.model("Image",yelpImage);