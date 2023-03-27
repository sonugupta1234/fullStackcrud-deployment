const express=require("express")
const app=express()
const router=require("./routes/user.routes")

const connection=require("./db")
const authenticate = require("./Middlewares/authenticate.middleware")
const  route  = require("./routes/posts.routes")
app.use(express.json())
app.use("/users",router)
app.use(authenticate)
app.use("/posts",route)

app.listen(7780,()=>{
    connection()
    console.log("Server Running")
})

module.exports=app