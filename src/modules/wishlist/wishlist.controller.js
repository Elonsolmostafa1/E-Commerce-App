import { catchAsyncError } from "../../utils/ErrorHandling/catchAsyncError.js"
import { AppError } from "../../utils/ErrorHandling/AppError.js"
import { userModel } from "../../../database/models/user.model.js"



export const addToWishlist = catchAsyncError(async(req,res,next)=>{
    const {product} = req.body
    let result = await userModel.findByIdAndUpdate(req.user._id , {$addToSet:{wishlist:product}} , {new:true})
    result? res.status(200).json({message: "success", status:200 , wishlist:result.wishlist}) : next(new AppError("failed",500))
})

export const deleteFromWishlist = catchAsyncError(async(req,res,next)=>{
    const {product} = req.body
    let result = await userModel.findByIdAndUpdate(req.user._id , {$pull:{wishlist:product}} , {new:true})
    result? res.status(200).json({message: "success", status:200 , wishlist:result.wishlist}) : next(new AppError("failed",500))
})

export const getWishlist = catchAsyncError(async(req,res,next)=>{
    let result = await userModel.findById(req.user._id)
    result? res.status(200).json({message: "success", status:200 , wishlist:result.wishlist}) : next(new AppError("failed",500))
})






