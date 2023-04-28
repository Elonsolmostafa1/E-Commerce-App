import { Router } from "express";
import * as categoryController from "./category.controller.js";
import * as categoryValidation from "./category.validation.js"
import subCategoryRouter from "../subCategory/subCategory.router.js";
import { validation } from "../../middleware/Validation/validation.js";
import { uploadSingleFile } from "../../middleware/Multer/fileUpload.js";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";

const categoryRouter = Router()

categoryRouter.use("/:categoryId/subCategories",subCategoryRouter)

categoryRouter
    .route('/')
    .post(protectedRoutes,allowTo("admin"),uploadSingleFile("image","category"),validation(categoryValidation.categoryNameSchema),categoryController.createCategory)
    .get(protectedRoutes,categoryController.getAllCategories)


categoryRouter
    .route("/:id")
    .get(protectedRoutes,validation(categoryValidation.categoryIdSchema),categoryController.getCategory)
    .delete(protectedRoutes,allowTo("admin"),validation(categoryValidation.categoryIdSchema),categoryController.deleteCategory)
    .put(protectedRoutes,allowTo("admin"),uploadSingleFile("image","category"),validation(categoryValidation.categoryUpdateSchema),categoryController.updateCategory)


export default categoryRouter