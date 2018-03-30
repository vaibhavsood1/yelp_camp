var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/yelp_camp');
var passportLocalMongoose = require("passport-local-mongoose");
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var userSchema= new Schema({
    
 username:String,
 password:String
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user",userSchema);