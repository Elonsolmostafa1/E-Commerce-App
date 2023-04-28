import { Router } from "express";
import * as subCategoryController from "./subCategory.controller.js";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";


const subCategoryRouter = Router({mergeParams:true})

subCategoryRouter
    .route('/')
    .post(protectedRoutes,allowTo("admin"),subCategoryController.createSubCategory)
    .get(protectedRoutes,subCategoryController.getAllSubCategories)


subCategoryRouter
    .route("/:id")
    .get(protectedRoutes,subCategoryController.getSubCategory)
    .delete(protectedRoutes,allowTo("admin"),subCategoryController.deleteSubCategory)
    .put(protectedRoutes,allowTo("admin"),subCategoryController.updateSubCategory)


export default subCategoryRouter