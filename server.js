import express from "express"
import dbConnection from "./database/dbConnection.js";
import * as dotenv from 'dotenv'


dotenv.config()

const app = express();
const port = 5000;

app.use(express.json());
dbConnection()



app.all('*',(req,res,next)=>{next(new AppError("Invalid url. Page not found",404))})


app.listen(process.env.PORT || port , ()=>{
    console.log(`Server is running on port: ${port} .......`)
})