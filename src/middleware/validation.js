export const validation = (schema)=>{
    return (req,res,next)=>{
        let inputs = {...req.body , ...req.params , ...req.query}
        let {error} = schema.validate(inputs,{abortEarly:false})
        if(error)
        {
            let errors = error.details.map(details=>details.message)
            res.status(400).json({status:400 , message:"failed",errors});
        }
        else
        {
            next()
        }
    }
}

