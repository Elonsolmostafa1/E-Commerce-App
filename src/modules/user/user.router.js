import { Router } from "express";
import * as userController from "./user.controller.js";

const userRouter = Router()

userRouter
    .route('/')
    .post(userController.createUser)
    .get(userController.getAllUsers)


userRouter
    .route("/:id")
    .get(userController.getUser)
    .delete(userController.deleteUser)
    .put(userController.updateUser)

userRouter.route("/changeUserPassword/:id").patch(userController.changeUserPassword)


export default userRouter