import { Router } from "express";
import * as brandController from "./brand.controller.js";

const brandRouter = Router()


brandRouter
    .route('/')
    .post(brandController.createBrand)
    .get(brandController.getAllBrands)


brandRouter
    .route("/:id")
    .get(brandController.getBrand)
    .delete(brandController.deleteBrand)
    .put(brandController.updateBrand)


export default brandRouter