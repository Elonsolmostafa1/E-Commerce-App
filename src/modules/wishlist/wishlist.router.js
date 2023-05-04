import { Router } from "express";
import * as wishlistController from "./wishlist.controller.js";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";

const wishlistRouter = Router()


wishlistRouter
    .route('/')
    .patch(protectedRoutes, allowTo("user") , wishlistController.addToWishlist)
    .delete(protectedRoutes, allowTo("user") , wishlistController.deleteFromWishlist)
    .get(protectedRoutes, allowTo("user") , wishlistController.getWishlist)
    


export default wishlistRouter