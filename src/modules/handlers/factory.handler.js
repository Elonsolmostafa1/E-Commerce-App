import { AppError } from "../../utils/ErrorHandling/AppError.js"
import { catchAsyncError } from "../../utils/ErrorHandling/catchAsyncError.js"

export const deleteOne = (model)=>{
    return catchAsyncError(async(req,res,next)=>{
        const {id} = req.params
        let result = await model.findByIdAndDelete(id)
        result? res.status(200).json({message: "success", status:200}) : next(new AppError("document not found",404))
    })
}