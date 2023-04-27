import mongoose, { Mongoose } from "mongoose";

const subCategorySchema = mongoose.Schema({
    name:{
        type:String,
        unique: [true , "name already exists"],
        trim: true,
        required: [true , "name is required"],
        minLength: [2 , "too short sub-category name"]
    },

    slug:{
        type:String,
        lowercase:true,
        required:true
    },

    category:{
        type: mongoose.Types.ObjectId,
        ref: "category"
    },

    }, {timeStamps:true})

export const subCategoryModel = mongoose.model("subCategory", subCategorySchema)