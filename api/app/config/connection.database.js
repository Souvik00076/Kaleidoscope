import mongoose from "mongoose"
export const connectDb=(uri)=>{
    return mongoose.connect(uri)
}