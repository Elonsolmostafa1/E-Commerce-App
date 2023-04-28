import multer from "multer";
import {v4 as uuidv4} from 'uuid'
import { AppError } from "../../utils/ErrorHandling/AppError.js";


let multerOptions = (folderName)=>{
    const storage = multer.diskStorage({
        destination: (req,res,cb)=>{cb(null,`uploads/${folderName}`)},
        filename: (req,file,cb)=>{cb(null,uuidv4()+"-"+ file.originalname)}
    })
    
    function fileFilter (req, file, cb) {
        file.mimetype.startsWith("image") ? cb(null, true):cb(new AppError("please upload an image",400), false)
    }

    return multer({storage,fileFilter})
}


export const uploadSingleFile = (fieldName,folderName)=> multerOptions(folderName).single(fieldName)

export const uploadMultipleFiles = (arrayOfFields,folderName)=> multerOptions(folderName).fields(arrayOfFields)
