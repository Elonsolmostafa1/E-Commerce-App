export const globalErrorHandling = (err,req,res,next)=>{
    let status = err.status || 500
    res.status(status).json({message:err.message,status:status})}