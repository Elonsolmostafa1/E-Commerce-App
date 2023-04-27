import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
    code:{
        type: String,
        unique: [true , "code already exists"],
        trim: true,
        required: [true , "code is required"],
    },

    discount:{
        type: Number,
        min: 0,
        required: [true , "discount is required"]
    },

    expires:{
        type: Date,
        required: [true , "coupon date is required"]
    },
    
    }, {timeStamps:true})

export const couponModel = mongoose.model("coupon", couponSchema)