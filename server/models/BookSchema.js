var Zangoose=require('mongoose');
var Schema=Zangoose.Schema;
var BookSchema= new Schema({
   username:{type:String,required:true},
   password:{type:String,required:true},
    fav_books:[{type:String}]
});



module.exports=Zangoose.model("Book",BookSchema);