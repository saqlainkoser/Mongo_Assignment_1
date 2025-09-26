const express= require("express")
const app=express()
const {MongoClient} = require("mongodb")
app.set("view engine","ejs")
//bson

const {ObjectId} = require('bson')

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

let db;

const connectDB =async () =>{
    try {
      const client = new MongoClient("mongodb://localhost:27017/")
        //connecting here  VVVVVVV
        await client.connect()
        // below command will create new database if not present
        db = client.db("SchoolDB")
        console.log("database connected.......")
    } catch (error) {
        console.log(error);
    }
}

connectDB();

app.get("/",async(req,res)=>{
     const data = await db.collection("class").find().toArray()
        console.log(data);
    res.render("main.ejs",{data})
})

app.post("/addStudent",async (req,res)=>{
    // {name:"dgajhsg",section:"d",Marks:23}
    console.log(req.body);
    const dbResp = await db.collection("class").insertOne(req.body)
    res.redirect("/")
})

app.get("/delete-stu/:id",async (req,res)=>{
    //_id: new ObjectId('68d65e52b56b6310bc5044df'),
    console.log(req.params.id);
    const id=req.params.id
    await db.collection("class").deleteOne({_id: new ObjectId(id)})
    res.redirect("/")
})





app.listen(4040,()=>{
    console.log("http://localhost:4040");
    
})