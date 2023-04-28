import { userModel } from "../../../database/models/user.model.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { catchAsyncError } from "../../utils/ErrorHandling/catchAsyncError.js"
import { AppError } from "../../utils/ErrorHandling/AppError.js"

export const signUp = catchAsyncError(async(req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email})
    user && next(new AppError("email already exists",409))
    let result = new userModel(req.body)
    await result.save()
    result? res.status(201).json({message: "success", status:201 , result}) : next(new AppError("failed",500))
})

export const signIn = catchAsyncError(async(req,res,next)=>{
    const {email , password} = req.body
    let user = await userModel.findOne({email})
    let match = await bcrypt.compare(password , user.password)
    if(user && match)
    {
        let token = jwt.sign({name:user.name , id:user._id , role:user.role} , "Elonsol_E_Commerce_App")
        return res.status(200).json({message: "success", status:200 , token})
    }
    next(new AppError("incorrect email or password",401))
})


export const protectedRoutes = catchAsyncError(async(req,res,next)=>{
    let {token} = req.headers
    !token && next(new AppError("invalid token",401))

    let decoded = jwt.verify(token , "Elonsol_E_Commerce_App")
    let user = await userModel.findById(decoded.id)

    !user && next(new AppError("user not found",401))

    if(user.passwordChangedAt)
    {
        let changePasswordDate = parseInt(user.passwordChangedAt.getTime()/1000)
        if(changePasswordDate > decoded.iat) {next(new AppError("invalid token",401))}
    }

    req.user = user
    next()
})

export const allowTo = (...roles)=>{
    return catchAsyncError(async(req,res,next)=>{
        !roles.includes(req.user.role)? next(new AppError("you are not authorized to access this route",401)) : next()
    })
}


