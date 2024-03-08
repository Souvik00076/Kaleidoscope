import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import { connectDb } from './app/config/connection.database.js '
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from './app/config/passport.config.js'
import authRouter from './route/auth.route.js'
import userRouter from './route/user.route.js'

//import all the middlewares
import ErrorHandler from './app/http/middleware/ErrorHandler.middleware.js'
import NotFoundHandler from './app/http/middleware/NoteFound.middleware.js'

const app=express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(passport.initialize())
app.use('/api/v1/auth/',authRouter)
app.use('/api/v1/user/',passport.authenticate('jwt',{session:false}),userRouter)
app.use(ErrorHandler)
app.use(NotFoundHandler)

const startServer=async()=>{
    console.log("Inside start server / api/index.js")
    const uri=process.env.MONGO_URI
    await connectDb(uri)
    app.listen(3000,()=>console.log(`Server listening at port ${process.env.PORT}`))
}

startServer()