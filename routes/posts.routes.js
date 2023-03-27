const express=require("express");
const postModel = require("../Model/posts.model");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const userModel = require("../Model/user.model");

const route=express.Router()

route.post("/add",async(req,res)=>{
    const {title,body,device,no_of_comments}=req.body

    try {
        const user=new postModel({title,body,device,no_of_comments})
        await user.save()
        res.status(200).send({"msg": "Post Added"})
    } catch (error) {
        res.status(400).send({"msg": error.message})
    }
})

route.get("/",async(req,res)=>{
    try {
        const user=await postModel.find()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send({"msg": error.message})
    }
})

route.patch("/update",async(req,res)=>{

    const {title}=req.body
    try {
        const user=await postModel.updateOne({title: title})
        res.status(200).send("Updated")
    } catch (error) {
        res.status(400).send({"msg": error.message})
    }
})

route.delete("/delete",async(req,res)=>{

    const {title}=req.body
    try {
        const user=await postModel.deleteOne({title})
        res.status(200).send("Deleted")
    } catch (error) {
        res.status(400).send({"msg": error.message})
    }
})

module.exports=route