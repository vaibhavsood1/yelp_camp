var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/yelp_camp');
var Image = require("./models/images.js");
var comment = require("./models/comments.js");



var data = [{
    name:"Aravali Hills",
    image:"https://recreation-acm.activefederal.com/assetfactory.aspx?did=5221",
    desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel dapibus nulla. Aenean in libero a elit pellentesque dapibus quis ac tortor. Curabitur pretium turpis orci, et consectetur nisl scelerisque eget. Quisque nec lacus nisi. Nunc euismod tincidunt placerat. Integer aliquam sollicitudin mi nec varius. Cras enim dui, euismod eget arcu non, co"
    
    
},{
     name:"Shimla Hills",
    image:"https://recreation-acm.activefederal.com/assetfactory.aspx?did=5221",
    desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel dapibus nulla. Aenean in libero a elit pellentesque dapibus quis ac tortor. Curabitur pretium turpis orci, et consectetur nisl scelerisque eget. Quisque nec lacus nisi. Nunc euismod tincidunt placerat. Integer aliquam sollicitudin mi nec varius. Cras enim dui, euismod eget arcu non, co"
},{
     name:"Jaipur desert",
    image:"https://recreation-acm.activefederal.com/assetfactory.aspx?did=5221",
    desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel dapibus nulla. Aenean in libero a elit pellentesque dapibus quis ac tortor. Curabitur pretium turpis orci, et consectetur nisl scelerisque eget. Quisque nec lacus nisi. Nunc euismod tincidunt placerat. Integer aliquam sollicitudin mi nec varius. Cras enim dui, euismod eget arcu non, co"
}];
function rem()
{
    Image.remove({},function(err){
        if(!err){
            console.log("delted!");
        // for(var i = 0;i<data.length;i++)        
        //     {
        //       Image.create(data[i],function(err,Image){
        //           if(!err){
                       
        //               console.log("created");
        //              comment.create({text:"just wowoowowow!",author:"ramu"},function(err,comment){
        //                  if(!err){
        //                 Image.comments.push(comment); 
        //                 Image.save(function(err,d){
        //                     if(!err){
        //                         console.log("comment created!");
        //                     }
        //                 });
        //                  }
        //              });
                       
        //           }
                   
        //       }); 
                
        //     }
        }
        
    })
    
    comment.remove({},function(err){
        if(!err){
            
            console.log("deleted!!")
        }
    })
    
}

module.exports = rem;