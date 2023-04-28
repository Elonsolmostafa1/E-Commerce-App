import { Router } from "express";
import * as productController from "./product.controller.js";
import { uploadMultipleFiles } from "../../middleware/Multer/fileUpload.js";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";

const productRouter = Router()

let fieldsArray = [{name:"imgCover" , maxCount:1} , {name:"images" , maxCount:8}]
productRouter
    .route('/')
    .post(protectedRoutes,allowTo("admin"),uploadMultipleFiles(fieldsArray,"product"),productController.createProduct)
    .get(protectedRoutes,productController.getAllProducts)


productRouter
    .route("/:id")
    .get(protectedRoutes,productController.getProduct)
    .delete(protectedRoutes,allowTo("admin"),productController.deleteProduct)
    .put(protectedRoutes,allowTo("admin"),productController.updateProduct)


export default productRouter