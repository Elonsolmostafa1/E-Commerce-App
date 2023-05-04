import dbConnection from "../database/dbConnection.js"
import authRouter from "./modules/auth/auth.router.js"
import brandRouter from "./modules/brand/brand.router.js"
import categoryRouter from "./modules/category/category.router.js"
import productRouter from "./modules/product/product.router.js"
import reviewRouter from "./modules/review/review.router.js"
import subCategoryRouter from "./modules/subCategory/subCategory.router.js"
import userRouter from "./modules/user/user.router.js"
import wishlistRouter from "./modules/wishlist/wishlist.router.js"
import { AppError } from "./utils/ErrorHandling/AppError.js"
import { globalErrorHandling } from "./utils/ErrorHandling/globalErrorHandling.js"

export function init(app)
{
    dbConnection()
    app.use("/categories" , categoryRouter)
    app.use("/subCategories" , subCategoryRouter)
    app.use("/brands" , brandRouter)
    app.use("/products" , productRouter)
    app.use("/users" , userRouter)
    app.use("/auth" , authRouter)
    app.use("/reviews" , reviewRouter)
    app.use("/wishlist" , wishlistRouter)
    app.all('*',(req,res,next)=>{next(new AppError("Invalid url. Page not found",404))})

    app.use(globalErrorHandling)

}