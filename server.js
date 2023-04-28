process.on("uncaughtException",()=>{console.log("uncaughtExceptionError")})

import express from "express"
import morgan from "morgan"
import * as dotenv from 'dotenv'
import { init } from "./src/AppInit.js"

dotenv.config()

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static('uploads'))
app.use(morgan("dev"))

init(app)

app.listen(process.env.PORT || port , ()=>{
    console.log(`Server is running on port: ${port} ...`)
})

process.on('unhandledRejection',()=>{console.log("unhandledRejectionError")})