import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        minLength:3,
        required:[true,'Username cannot be empty']
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
    },
    photourl:{
        type:String,
        default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw3aWBsK6CM7SHNB-qYKS0pb&ust=1709808862222000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCR8cC834QDFQAAAAAdAAAAABAE'
    }
},{timestamps:true})

UserSchema.methods.getUserName=function(){
    return this.username
}

UserSchema.methods.getEmail=function(){
    return this.email
}

UserSchema.methods.getPhotoUrl=function(){
    return this.photourl
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