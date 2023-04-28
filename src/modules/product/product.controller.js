import slugify from "slugify"
import {productModel} from "../../../database/models/product.model.js"
import { catchAsyncError } from "../../utils/ErrorHandling/catchAsyncError.js"
import { AppError } from "../../utils/ErrorHandling/AppError.js"
import * as factory from "../handlers/factory.handler.js"
import ApiFeatures from "../../utils/ApiFeatures/ApiFeatures.js"



export const createProduct = catchAsyncError(async(req,res,next)=>{
    console.log(req.files)
    req.body.imgCover = req.files.imgCover[0].filename
    req.body.images = req.files.images.map(img=>img.filename)
    req.body.slug = slugify(req.body.title)
    let result = new productModel(req.body)
    await result.save()
    result? res.status(201).json({message: "success", status:201 , result}) : next(new AppError("failed",500))
})

export const getAllProducts = catchAsyncError(async(req,res,next)=>{
    
    let apiFeatures = new ApiFeatures(productModel.find(),req.query)
    .paginate().filter().search().sort().fields()

    let result = await apiFeatures.mongooseQuery
    result? res.status(200).json({message: "success", status:200 , page:apiFeatures.page , result}) : next(new AppError("failed",500))
})

export const getProduct = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    let result = await productModel.findById(id)
    result? res.status(200).json({message: "success", status:200 , result}) : next(new AppError("Product not found",404))
})

export const deleteProduct = factory.deleteOne(productModel)

export const updateProduct = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    if(req.body.title) {req.body.slug = slugify(req.body.title)}
    let result = await productModel.findByIdAndUpdate(id,req.body,{new:true})
    result? res.status(200).json({message: "success" , status:200, result}) : next(new AppError("Product not found",404))
})