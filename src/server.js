import express from "express"
import dotenv from "dotenv"
import { connection } from "./database/db.js"
import authRouter from './routes/auth.route.js'
import productRouter from './routes/product.route.js'
import cookieParser from "cookie-parser"
import swaggerUi from "swagger-ui-express"
import fs from "fs"
import path from "path"

const swaggerDocumentPath = path.resolve("./src/swagger-output.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerDocumentPath, "utf-8"));

dotenv.config()

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
// routes

app.use('/api',authRouter)
app.use('/api',productRouter)

app.listen(port,()=>{
    connection()
    console.log(`server is running on port:${port}`)
})