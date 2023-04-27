import { Router } from "express";
import * as subCategoryController from "./subCategory.controller.js";


const subCategoryRouter = Router({mergeParams:true})

subCategoryRouter
    .route('/')
    .post(subCategoryController.createSubCategory)
    .get(subCategoryController.getAllSubCategories)


subCategoryRouter
    .route("/:id")
    .get(subCategoryController.getSubCategory)
    .delete(subCategoryController.deleteSubCategory)
    .put(subCategoryController.updateSubCategory)


export default subCategoryRouter