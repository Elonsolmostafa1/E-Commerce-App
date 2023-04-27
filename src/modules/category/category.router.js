import { Router } from "express";
import * as categoryController from "./category.controller.js";
import subCategoryRouter from "../subCategory/subCategory.router.js";

const categoryRouter = Router()

categoryRouter.use("/:categoryId/subCategories",subCategoryRouter)

categoryRouter
    .route('/')
    .post(categoryController.createCategory)
    .get(categoryController.getAllCategories)


categoryRouter
    .route("/:id")
    .get(categoryController.getCategory)
    .delete(categoryController.deleteCategory)
    .put(categoryController.updateCategory)


export default categoryRouter