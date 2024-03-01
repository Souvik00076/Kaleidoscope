import express from 'express'
import dotenv from 'dotenv'

dotenv.config({path:'../.env'})
import { connectDb } from './app/config/connection.database.js '
const app=express()

const startServer=async()=>{
    console.log("Inside start server / api/index.js")
    const uri='mongodb+srv://souvikbhattacharjee00076:wUDMX7U1uaQMOb5y@cluster1.dyktolh.mongodb.net/Kaleidoscope?retryWrites=true&w=majority'
    await connectDb(uri)
    app.listen(3000,()=>console.log(`Server listening at port ${process.env.PORT}`))
}

startServer()