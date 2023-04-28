import slugify from "slugify"
import {userModel} from "../../../database/models/user.model.js"
import { catchAsyncError } from "../../utils/ErrorHandling/catchAsyncError.js"
import { AppError } from "../../utils/ErrorHandling/AppError.js"
import * as factory from "../handlers/factory.handler.js"
import ApiFeatures from "../../utils/ApiFeatures/ApiFeatures.js"


export const createUser = catchAsyncError(async(req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email})
    user && next(new AppError("email already exists",409))
    let result = new userModel(req.body)
    await result.save()
    result? res.status(201).json({message: "success", status:201 , result}) : next(new AppError("failed",500))
})

export const getAllUsers = catchAsyncError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(userModel.find(),req.query)
    .paginate().filter().sort().fields()

    let result = await apiFeatures.mongooseQuery
    result? res.status(200).json({message: "success", status:200 , result}) : next(new AppError("failed",500))
})

export const getUser = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    let result = await userModel.findById(id)
    result? res.status(200).json({message: "success", status:200 , result}) : next(new AppError("User not found",404))
})

export const deleteUser = factory.deleteOne(userModel)

export const updateUser = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    let result = await userModel.findByIdAndUpdate(id,req.body,{new:true})
    result? res.status(200).json({message: "success" , status:200, result}) : next(new AppError("User not found",404))
})

export const changeUserPassword = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    req.body.passwordChangedAt = Date.now()
    let result = await userModel.findByIdAndUpdate(id,req.body,{new:true})
    result? res.status(200).json({message: "success" , status:200, result}) : next(new AppError("User not found",404))
})





