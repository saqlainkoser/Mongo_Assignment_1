const {User} = require("./user")
const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/mydatabase1")
              .then(()=> console.log("Database Connected"))
              .catch((err)=> console.log("Connection Failed",err))


app.post("/",async(req,res)=>{
    try {
      const user = new User(req.body)
      await user.save()
      res.status(201).json({message:"User Added",user})
    } catch (error) {
        console.log("User Not Created :",error)
        res.status(400).json({ error: error.message })
    }
})

app.listen(8090,()=>{
    console.log("http://localhost:8090");
})