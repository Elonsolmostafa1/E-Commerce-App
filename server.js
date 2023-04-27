process.on("uncaughtException",()=>{console.log("uncaughtExceptionError")})

import express from "express"
import morgan from "morgan"
import * as dotenv from 'dotenv'
import dbConnection from "./database/dbConnection.js";
import categoryRouter from "./src/modules/category/category.router.js";
import subCategoryRouter from "./src/modules/subCategory/subCategory.router.js"
import { globalErrorHandling } from "./src/utils/ErrorHandling/globalErrorHandling.js";
import { AppError } from "./src/utils/ErrorHandling/AppError.js";


dotenv.config()

const app = express();
const port = 5000;

app.use(express.json());
app.use(morgan("dev"))
dbConnection()


app.use("/categories" , categoryRouter)
app.use("/subCategories" , subCategoryRouter)
app.all('*',(req,res,next)=>{next(new AppError("Invalid url. Page not found",404))})

app.use(globalErrorHandling)

app.listen(process.env.PORT || port , ()=>{
    console.log(`Server is running on port: ${port} ...`)
})

process.on('unhandledRejection',()=>{console.log("unhandledRejectionError")})