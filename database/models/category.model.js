import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        unique: [true , "name already exists"],
        trim: true,
        required: [true , "name is required"],
        minLength: [2 , "too short category name"]
    },

    slug:{
        type:String,
        lowercase:true,
        required:true
    },

    image: String,

    }, {timeStamps:true})

    categorySchema.post("init",(doc)=>{
        doc.image = process.env.BASE_URL + "/category/" + doc.image
    })

export const categoryModel = mongoose.model("category", categorySchema)