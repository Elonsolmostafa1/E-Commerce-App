import slugify from "slugify"
import {categoryModel} from "../../../database/models/category.model.js"


export const createCategory = async(req,res,next)=>{
    const {name} = req.body
    let result = new categoryModel({name , slug:slugify(name)})
    await result.save()
    result? res.json({message: "success" , result}) : res.json({message: "failed"})
}

export const getAllCategories = async(req,res,next)=>{
    let result = await categoryModel.find({})
    result? res.json({message: "success" , result}) : res.json({message: "failed"})
}

export const getCategory = async(req,res,next)=>{
    const {id} = req.params
    let result = await categoryModel.findById(id)
    result? res.json({message: "success" , result}) : res.json({message: "failed"})
}

export const deleteCategory = async(req,res,next)=>{
    const {id} = req.params
    let result = await categoryModel.findByIdAndDelete(id)
    result? res.json({message: "success" , result}) : res.json({message: "category not found"})
}

export const updateCategory = async(req,res,next)=>{
    const {id} = req.params
    const {name} = req.body
    let result = await categoryModel.findByIdAndUpdate(id,{name,slug})
    result? res.json({message: "success" , result}) : res.json({message: "category not found"})
}





