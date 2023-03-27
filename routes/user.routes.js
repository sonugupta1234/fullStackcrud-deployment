const express=require("express");
const userModel = require("../Model/user.model");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const router=express.Router()

router.post("/register",async(req,res)=>{
    const {email,password,gender,name,age,city,is_married}=req.body

    try {

        const user1=await userModel.findOne({email})
        if(user1){
            res.status(400).send({"msg": "User already exist, please login",})
        }else
        bcrypt.hash(password, 5, async(err, hash)=> {
            const user=new userModel({email,password: hash,gender,name,age,city,is_married})
            await user.save()
            res.status(200).send({"msg": "Register Sucessfull"})
        });
    } catch (error) {
        res.status(400).send({"msg": error.message})
    }
})

router.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await userModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                if(result){
                    res.status(200).send({"msg": "Login Sucessfull", "token": jwt.sign({"userID": user._id}, 'bruce')})
                }else{
                    res.status(400).send({"msg": "Wrong Credentials"})
                }
            });
        }
    } catch (error) {
        res.status(400).send({"msg": error.message})
    }
})


module.exports=router