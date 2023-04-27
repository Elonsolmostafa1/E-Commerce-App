import { Router } from "express";
import * as productController from "./product.controller.js";

const productRouter = Router()


productRouter
    .route('/')
    .post(productController.createProduct)
    .get(productController.getAllProducts)


productRouter
    .route("/:id")
    .get(productController.getProduct)
    .delete(productController.deleteProduct)
    .put(productController.updateProduct)


export default productRouter