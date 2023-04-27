import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true , "name is required"],
        minLength: [2 , "too short user name"]
    },

    email:{
        type:String,
        unique: [true , "email already exists"],
        trim: true,
        required: [true , "email is required"],
        minLength: 5
    },

    password:{
        type: String,
        required: [true , "password is required"]
    },

    phone:{
        type: String,
        required: [true , "password is required"]
    },

    profilePic: String,

    role:{
        type:String,
        enum:["user" , "admin"],
        default: "user"
    },

    isActive:{
        type: Boolean,
        default: true
    },

    verified:{
        type: Boolean,
        defualt: false
    }
    
    }, {timeStamps:true})

export const userModel = mongoose.model("user", userSchema)