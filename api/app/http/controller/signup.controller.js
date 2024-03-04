
import { StatusCodes } from 'http-status-codes'
import {ValidationError} from '../error/Error.index.js'
import User from '../model/user.model.js'
const signUpUser=async (req,res)=>{
    const data={...req.body}
    if(!data.username || !data.email || !data.password){
        throw new ValidationError('Name, Email and Password are required')
    }
    const user=await User.create(data)
    const {password,...rest}=user._doc
    res.status(StatusCodes.CREATED).json({success:true,rest})
}

export  {signUpUser}