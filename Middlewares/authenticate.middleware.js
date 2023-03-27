const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization

   
    if(token){
        const decoded=jwt.verify(token,"masai")
        if(decoded){
            req.body.userID=decoded.userID
            next()
        }else{
            res.status(400).send({"msg": "Please Login"})
        }
    }else{
        res.status(400).send({"msg": "Please Login"})
    }
  
}
module.exports=authenticate