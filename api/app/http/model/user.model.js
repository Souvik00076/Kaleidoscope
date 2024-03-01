import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        required:[true,'Name cannot be empty'],
        unique:[true,'Username already present']
    },
    password:{
        type:String,
        minLength:3,
        required:[true,'Password cannot be empty']
    },
    email:{
        type:String,
        match:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        required:[true,"Email cannot be empty"],
        unique:[true,"Email already present"]
    },
    subscribers:{
        type:Number,
        default:0,
    },
    subscribedUsers:{
        type:[String],
        default:[]
    }
},{timestamps:true})

UserSchema.methods.getName=function(){
    return this.name
}

UserSchema.methods.getEmail=function(){
    return this.email
}

UserSchema.pre('save', async function(next){
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next() 
})

UserSchema.methods.match=async function(creadential){
    const isMatch=await bcrypt.compare(creadential,this.password)
    return isMatch
}
export default mongoose.model("User",UserSchema)