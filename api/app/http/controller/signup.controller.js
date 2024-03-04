
import {ValidationError} from '../error/Error.index.js'
import User from '../model/user.model.js'
const signUpUser=async(req,res)=>{
    const {username,email,password}=req.body
    if(!username || !email || !password){
        throw new ValidationError('Name, Email and Password are required')
    }
    console.log("called here")
    res.send({message:"Signup successfull"})
}

export  {signUpUser}