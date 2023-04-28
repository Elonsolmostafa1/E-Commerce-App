process.on("uncaughtException",()=>{console.log("uncaughtExceptionError")})

import express from "express"
import morgan from "morgan"
import * as dotenv from 'dotenv'
import dbConnection from "./database/dbConnection.js";
import categoryRouter from "./src/modules/category/category.router.js";
import subCategoryRouter from "./src/modules/subCategory/subCategory.router.js"
import brandRouter from "./src/modules/brand/brand.router.js"
import productRouter from "./src/modules/product/product.router.js"
import userRouter from "./src/modules/user/user.router.js"
import authRouter from "./src/modules/auth/auth.router.js"
import { globalErrorHandling } from "./src/utils/ErrorHandling/globalErrorHandling.js";
import { AppError } from "./src/utils/ErrorHandling/AppError.js";


dotenv.config()

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static('uploads'))
app.use(morgan("dev"))
dbConnection()


app.use("/categories" , categoryRouter)
app.use("/subCategories" , subCategoryRouter)
app.use("/brands" , brandRouter)
app.use("/products" , productRouter)
app.use("/users" , userRouter)
app.use("/auth" , authRouter)
app.all('*',(req,res,next)=>{next(new AppError("Invalid url. Page not found",404))})

app.use(globalErrorHandling)

app.listen(process.env.PORT || port , ()=>{
    console.log(`Server is running on port: ${port} ...`)
})

process.on('unhandledRejection',()=>{console.log("unhandledRejectionError")})