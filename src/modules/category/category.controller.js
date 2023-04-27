import slugify from "slugify"
import {categoryModel} from "../../../database/models/category.model.js"
import { catchAsyncError } from "../../utils/ErrorHandling/catchAsyncError.js"
import { AppError } from "../../utils/ErrorHandling/AppError.js"
import * as factory from "../handlers/factory.handler.js"


export const createCategory = catchAsyncError(async(req,res,next)=>{
    const {name} = req.body
    let result = new categoryModel({name , slug:slugify(name)})
    await result.save()
    result? res.status(201).json({message: "success", status:201 , result}) : next(new AppError("failed",500))
})

export const getAllCategories = catchAsyncError(async(req,res,next)=>{
    let result = await categoryModel.find({})
    result? res.status(200).json({message: "success", status:200 , result}) : next(new AppError("failed",500))
})

export const getCategory = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    let result = await categoryModel.findById(id)
    result? res.status(200).json({message: "success", status:200 , result}) : next(new AppError("category not found",404))
})

export const deleteCategory = factory.deleteOne(categoryModel)

export const updateCategory = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    const {name} = req.body
    let result = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
    result? res.status(200).json({message: "success" , status:200, result}) : next(new AppError("category not found",404))
})





