import slugify from "slugify"
import {brandModel} from "../../../database/models/brand.model.js"
import { catchAsyncError } from "../../utils/ErrorHandling/catchAsyncError.js"
import { AppError } from "../../utils/ErrorHandling/AppError.js"
import * as factory from "../handlers/factory.handler.js"



export const createBrand = catchAsyncError(async(req,res,next)=>{
    const {name} = req.body
    let result = new brandModel({name , slug:slugify(name)})
    await result.save()
    result? res.status(201).json({message: "success", status:201 , result}) : next(new AppError("failed",500))
})

export const getAllBrands = catchAsyncError(async(req,res,next)=>{
    let result = await brandModel.find({})
    result? res.status(200).json({message: "success", status:200 , result}) : next(new AppError("failed",500))
})

export const getBrand = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    let result = await brandModel.findById(id)
    result? res.status(200).json({message: "success", status:200 , result}) : next(new AppError("Brand not found",404))
})

export const deleteBrand = factory.deleteOne(brandModel)

export const updateBrand = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    const {name} = req.body
    let result = await brandModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
    result? res.status(200).json({message: "success" , status:200, result}) : next(new AppError("Brand not found",404))
})