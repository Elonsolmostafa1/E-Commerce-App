import { Router } from "express";
import * as reviewController from "./review.controller.js";
import { uploadSingleFile } from "../../middleware/Multer/fileUpload.js";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";

const reviewRouter = Router()


reviewRouter
    .route('/')
    .post(protectedRoutes,allowTo("user"),reviewController.createReview)
    .get(protectedRoutes,reviewController.getAllReviews)


reviewRouter
    .route("/:id")
    .get(protectedRoutes,reviewController.getReview)
    .delete(protectedRoutes,allowTo("admin" , "user"),reviewController.deleteReview)
    .put(protectedRoutes,allowTo("user"),reviewController.updateReview)


export default reviewRouter