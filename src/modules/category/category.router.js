import { Router } from "express";
import * as categoryController from "./category.controller.js";
import * as categoryValidation from "./category.validation.js"
import subCategoryRouter from "../subCategory/subCategory.router.js";
import { validation } from "../../middleware/validation.js";

const categoryRouter = Router()

categoryRouter.use("/:categoryId/subCategories",subCategoryRouter)

categoryRouter
    .route('/')
    .post(validation(categoryValidation.categoryNameSchema),categoryController.createCategory)
    .get(categoryController.getAllCategories)


categoryRouter
    .route("/:id")
    .get(validation(categoryValidation.categoryIdSchema),categoryController.getCategory)
    .delete(validation(categoryValidation.categoryIdSchema),categoryController.deleteCategory)
    .put(validation(categoryValidation.categoryUpdateSchema),categoryController.updateCategory)


export default categoryRouter