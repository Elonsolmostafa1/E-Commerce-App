import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    comment:{
        type:String,
        trim: true,
        required: [true , "comment is required"],
    },

    product:{
        type: mongoose.Types.ObjectId,
        ref: "product"
    },

    user:{
        type: mongoose.Types.ObjectId,
        ref: "user"
    },

    }, {timeStamps:true})

export const reviewModel = mongoose.model("review", reviewSchema)