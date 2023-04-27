import { Router } from "express";
import * as categoryController from "./category.controller.js";

const categoryRouter = Router()

categoryRouter
    .route('/').post(categoryController.createCategory)
    .get(categoryController.getAllCategories)


categoryRouter
    .route("/:id").get(categoryController.getCategory)
    .delete(categoryController.deleteCategory)
    .put(categoryController.updateCategory)


export default categoryRouter