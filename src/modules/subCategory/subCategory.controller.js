import slugify from "slugify"
import {subCategoryModel} from "../../../database/models/subCategory.model.js"
import { catchAsyncError } from "../../utils/ErrorHandling/catchAsyncError.js"
import { AppError } from "../../utils/ErrorHandling/AppError.js"


export const createSubCategory = catchAsyncError(async(req,res,next)=>{
    const {name,category} = req.body
    let result = new subCategoryModel({name , category , slug:slugify(name)})
    await result.save()
    result? res.status(201).json({message: "success", status:201 , result}) : next(new AppError("failed",500))
})

export const getAllSubCategories = catchAsyncError(async(req,res,next)=>{
    let filter = {}
    if(req.params.categoryId) {filter = {category:req.params.categoryId}}
    let result = await subCategoryModel.find(filter)
    result? res.status(200).json({message: "success", status:200 , result}) : next(new AppError("failed",500))
})

export const getSubCategory = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    let result = await subCategoryModel.findById(id)
    result? res.status(200).json({message: "success", status:200 , result}) : next(new AppError("category not found",404))
})

export const deleteSubCategory = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    let result = await subCategoryModel.findByIdAndDelete(id)
    result? res.status(200).json({message: "success", status:200}) : next(new AppError("category not found",404))
})

export const updateSubCategory = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    const {name,category} = req.body
    let result = await subCategoryModel.findByIdAndUpdate(id,{name,category,slug:slugify(name)},{new:true})
    result? res.status(200).json({message: "success" , status:200, result}) : next(new AppError("category not found",404))
})





