import { StatusCodes } from "http-status-codes"
import User from '../model/user.model.js'
const updateUserController=async(req,res,next)=>{

    const _id=req.params.id
    try{
        const user=await User.findByIdAndUpdate(_id,{...req.user})
        if(!user) throw new Error("User Not Found")
        const {password,...rest}=user._doc
        res.status(StatusCodes.OK).json({success:true,data:rest})
    }catch(error){
        next(error)
    }
}
export {updateUserController}