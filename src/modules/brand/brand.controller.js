import slugify from "slugify"
import {brandModel} from "../../../database/models/brand.model.js"
import { catchAsyncError } from "../../utils/ErrorHandling/catchAsyncError.js"
import { AppError } from "../../utils/ErrorHandling/AppError.js"
import * as factory from "../handlers/factory.handler.js"



export const createBrand = catchAsyncError(async(req,res,next)=>{
    req.body.logo = req.file.filename
    req.body.slug = slugify(req.body.name)
    let result = new brandModel(req.body)
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
    req.body.logo = req.file.filename
    req.body.slug = slugify(req.body.name)
    let result = await brandModel.findByIdAndUpdate(id,req.body,{new:true})
    result? res.status(200).json({message: "success" , status:200, result}) : next(new AppError("Brand not found",404))
})