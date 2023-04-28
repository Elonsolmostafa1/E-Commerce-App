import { Router } from "express";
import * as brandController from "./brand.controller.js";
import { uploadSingleFile } from "../../middleware/Multer/fileUpload.js";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";

const brandRouter = Router()


brandRouter
    .route('/')
    .post(protectedRoutes,allowTo("admin"),uploadSingleFile("logo","brand"),brandController.createBrand)
    .get(protectedRoutes,brandController.getAllBrands)


brandRouter
    .route("/:id")
    .get(protectedRoutes,brandController.getBrand)
    .delete(protectedRoutes,allowTo("admin"),brandController.deleteBrand)
    .put(protectedRoutes,allowTo("admin"),uploadSingleFile("logo","brand"),brandController.updateBrand)


export default brandRouter