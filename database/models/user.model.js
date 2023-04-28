import mongoose from "mongoose";
import bcrypt from "bcrypt"

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

    passwordChangedAt: Date,

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

    userSchema.pre("save",function(){
        this.password = bcrypt.hashSync(this.password,8)
    })

    userSchema.pre("findOneAndUpdate",function(){
        if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password,8)
    })

export const userModel = mongoose.model("user", userSchema)