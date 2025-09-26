const express= require("express")
const app=express()
const {MongoClient} = require("mongodb")

//this function will connect my mongodb server to our server.js file
//async task
let db;

const connectDB =async () =>{
    try {
      const client = new MongoClient("mongodb://localhost:27017/")
        //connecting here  VVVVVVV
        await client.connect()
        // below command will create new database if not present
        db = client.db("CompanyDB")
        console.log("database connected.......")
    } catch (error) {
        console.log(error);
    }
}

connectDB();

//point 1
//enter 6 data 

app.get("/seed-employees",async (req,res)=>{
    let respDB=await db.collection("employees")
    .insertMany([
        {empId:1,name:"suraj",salary:30000,deptId:1},
        {empId:2,name:"aman",salary:30000,deptId:1},
        {empId:3,name:"rahul",salary:30000,deptId:2},
        {empId:4,name:"raj",salary:30000,deptId:3},
        {empId:5,name:"roshan",salary:30000,deptId:1},
        {empId:6,name:"dheeraj",salary:30000,deptId:4},

    ])
    res.send(respDB)
})



app.get("/update-employee/:id/:age",async(req,res)=>{
   const userId =  Number(req.params.id)
   const age = Number(req.params.age)
   await db.collection("usersA")
           .updateOne({id:userId},{$set:{age:age}})
    res.redirect("/view")
})

// http://localhost:3023/update-employee/4/30

//delete any document against id 
// /delete-employee/4



//point 2 
//to show all data
app.get("/view-employees",async(req,res)=>{
   const data=  await db.collection("employees")
                        .find()
                        .toArray()
   res.send(data)
})

//point 3 
// /add-employee/:id/:name/:salary/:deptid
app.get("/add-employee/:id/:name/:salary/:deptId",async(req,res)=>{
    let id = Number(req.params.id)
    let name = req.params.name
    let salary = Number(req.params.salary)
    let deptId = Number(req.params.deptId)
    let respDB=await db.collection("employees")
    .insertOne({empId:id,name:name,salary:salary,deptId:deptId})
    res.redirect("/view-employees")
})


//point 5

app.get("/delete-employees-lt/:id",async(req,res)=>{
    let id = Number(req.params.id)
    let respDB=await db.collection("employees")
    .deleteMany({empId:{$lt:id}})
    //$gt
    //$et
    //$gte
    //$lte
    res.redirect("/view-employees")
})


app.get("/delete/:id",async(req,res)=>{
    let userId = Number(req.params.id)
   const respDB = await db.collection("usersA").deleteOne({id:userId})
   res.send(respDB)
})

//update 

app.listen(3023,()=>{
    console.log("http://localhost:3023");
})
