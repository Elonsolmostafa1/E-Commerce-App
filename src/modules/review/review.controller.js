import slugify from "slugify"
import {reviewModel} from "../../../database/models/review.model.js"
import { catchAsyncError } from "../../utils/ErrorHandling/catchAsyncError.js"
import { AppError } from "../../utils/ErrorHandling/AppError.js"
import * as factory from "../handlers/factory.handler.js"



export const createReview = catchAsyncError(async(req,res,next)=>{
    req.body.user = req.user._id
    let isReview = await reviewModel.findOne({user:req.user._id , product:req.body.product})
    isReview && next(new AppError("you can review on product once",409))
    let result = new reviewModel(req.body)
    await result.save()
    result? res.status(201).json({message: "success", status:201 , result}) : next(new AppError("failed",500))
})

export const getAllReviews = catchAsyncError(async(req,res,next)=>{
    let result = await reviewModel.find({})
    result? res.status(200).json({message: "success", status:200 , result}) : next(new AppError("failed",500))
})

export const getReview = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    let result = await reviewModel.findById(id)
    result? res.status(200).json({message: "success", status:200 , result}) : next(new AppError("Review not found",404))
})

export const deleteReview = factory.deleteOne(reviewModel)

export const updateReview = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    let result = await reviewModel.findOneAndUpdate({_id:id , user:req.user._id},req.body,{new:true})
    !result && next(new AppError("Review not found or you aren't authorized",400))
    result? res.status(200).json({message: "success" , status:200, result}) : next(new AppError("Review not found",404))
})