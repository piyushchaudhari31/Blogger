const mongoose = require('mongoose')
const blogSchmea = new mongoose.Schema({
    title:{type:String},
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        
    }, 
    description:{type:String},
    image:{type:String},
    category:{type:String,default:"Life-style",enum:["Technology","Startup","Life-style","Tour"]}
},{timestamps:true})

const blogModel = mongoose.model("blog",blogSchmea)

module.exports = blogModel