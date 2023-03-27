const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    title: String,
    body: String,
    device: String,
    no_of_comments: Number
   
})

const postModel=mongoose.model("postuser",userSchema)

module.exports=postModel