const mongoose = require("mongoose")

// funtion will connect to DB

const  connectDB = async () => {
     
    try {
        await mongoose.connect("mongodb://localhost:27017/")
        console.log("MongoDB Mongoose Connected");
    } catch (error) {
        console.log("MongoDB Error: ",error);
    }
       
}

//Schema - > Model 

// creating schema
const userSchema = new mongoose.Schema({
    //shaan
    name : {
        type : String,
        required : true,
        set: (v)=> v.toUpperCase() 
    },
    phone: {
        type : String,
        minlength : [5,"Min length of Phone no. -- 5"],
        maxlength : [10,"Max length of Phone no. --  10"]
    },
    email: String,
    //min 10000 , 33004
    salary:{
        type : Number,
        validate : {
            validator : (v)=> v % 1000 === 0,
            message : "Enter Multiple of 1000"
        }
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

const userModel = new mongoose.model("User",userSchema);

// Perform a data operation ( e.g saving save )

const createUser = async () =>{
    const newUser =  new userModel({
        name : "Shaan",
        phone: "2222222222",
        salary : 40000
    })
    const dbresp  = await  newUser.save()
    console.log(dbresp);
}

connectDB() // connecting DB
createUser() // creating User 