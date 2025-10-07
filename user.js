const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : {
        type:String,
        required : true,
        set: (value) => value.toLowerCase() 
    },
    email: String,
    phone: {
        type : String,
        minlength: [3,"Min - 3 char"], // Minimum 3 characters
        maxlength: [20,"Max - 20 char"]
    },
    salary:{
        type: Number,
        min: [10000, "Salary must be at least 10,000"],
        validate: {
                validator: (v) => v % 1000 === 0,
                message: "Salary must be a multiple of 1,000",
    },
    },
    password: String
})

const User = mongoose.model("User",userSchema)

module.exports = {User}