import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
    name:{
        type:String,
        unique: [true , "name already exists"],
        trim: true,
        required: [true , "name is required"],
        minLength: [2 , "too short brand name"]
    },

    slug:{
        type:String,
        lowercase:true,
        required:true
    },

    logo: String,

    }, {timeStamps:true})

export const brandModel = mongoose.model("brand", brandSchema)