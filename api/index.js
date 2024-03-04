import express from 'express'
import dotenv from 'dotenv'
dotenv.config({path:'../.env'})
import 'express-async-errors'
import { connectDb } from './app/config/connection.database.js '
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './route/auth.route.js'


//import all the middlewares
import ErrorHandler from './app/http/middleware/ErrorHandler.middleware.js'
import NotFoundHandler from './app/http/middleware/NoteFound.middleware.js'

const app=express()
app.use(express.json())
app.use(cors())

app.use('/api/v1/auth/',authRouter)
app.use(ErrorHandler)
app.use(NotFoundHandler)

const startServer=async()=>{
    console.log("Inside start server / api/index.js")
    const uri='mongodb+srv://souvikbhattacharjee00076:wUDMX7U1uaQMOb5y@cluster1.dyktolh.mongodb.net/Kaleidoscope?retryWrites=true&w=majority'
    await connectDb(uri)
    app.listen(3000,()=>console.log(`Server listening at port ${process.env.PORT}`))
}

startServer()