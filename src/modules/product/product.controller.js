import slugify from "slugify"
import {productModel} from "../../../database/models/product.model.js"
import { catchAsyncError } from "../../utils/ErrorHandling/catchAsyncError.js"
import { AppError } from "../../utils/ErrorHandling/AppError.js"
import * as factory from "../handlers/factory.handler.js"
import mongoose from "mongoose"



export const createProduct = catchAsyncError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.title)
    let result = new productModel(req.body)
    await result.save()
    result? res.status(201).json({message: "success", status:201 , result}) : next(new AppError("failed",500))
})

export const getAllProducts = catchAsyncError(async(req,res,next)=>{
    //handle pagination
    let page = Math.max(req.query.page*1 || 1 , 1)
    let skip = (page-1)*5

    // handle filteration
    // Deep copy but why ?
    /* answer: because I will need the things like sort,page .... later so I want to only take a copy not a pointer 
       to the same object bacause if I take a pointer to the same object 
       modification to req.query or filterObject will have the same impact because both reference the same object in memery 
    */
    let filterObject = {...req.query}
    // array of words to be removed from filteration object
    let excludedWordsFromFilterObject = ['page','fields','sort','keyword']
    // loop on filterObject and delete the four words if exist
    excludedWordsFromFilterObject.forEach((elm)=>{delete filterObject[elm]})
    // adding $ to each key of filterObject
    // first convert it to string so you can use replace method in String
    // recall : using toString() will not convert the object to string but it will be the format of "object"
    filterObject = JSON.stringify(filterObject)
    // we will replace the operator in the string with $operator
    // the second parameter of replace can be a function that take a agrument with value of the first parameter of replace function
    // /g in regex to make it global to match all occurrence not only the first occurrence
    filterObject = filterObject.replace(/\b(gt|gte|lt|lte)\b/g, match=> `$${match}`)
    // convert the string to object again
    filterObject = JSON.parse(filterObject)
    console.log(filterObject)

    let allProductsQuery = productModel.find(filterObject).skip(skip).limit(5)

    // handle sorting
    if(req.query.sort)
    {
        // why we split first? 
        // answer : beacuse the attributes must be separated by space not ','
        // split function returns array of attributes to sort with
        // join is an array method to convert the array to string whose words separated by the value it take which is space here
        // to summerize it convert price,sold -----> price sold
        let sortAttributes = req.query.sort.split(',').join(' ')
        // chaining is available on the query
        allProductsQuery.sort(sortAttributes)
    }

    // handle search by keyword
    if(req.query.keyword)
    {
        // regex only to make search insenstive
        // $or to make search on title or description
        allProductsQuery.find(
            {
                $or:
                [{title:{$regex:req.query.keyword,$options:'i'}},{description:{$regex:req.query.keyword,$options:'i'}}]
            })
    }

    // handle selected fields (like sort)
    if(req.query.fields)
    {
        let selectedAttributes = req.query.fields.split(',').join(' ')
        allProductsQuery.select(selectedAttributes)
    }

    let result = await allProductsQuery
    result? res.status(200).json({message: "success", status:200 , page , result}) : next(new AppError("failed",500))
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