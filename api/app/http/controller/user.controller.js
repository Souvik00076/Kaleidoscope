import { StatusCodes } from "http-status-codes"
import passport from 'passport'
import ForBiddenError from "../error/ForBidden.error.js"
const updateUserController=(req,res,next)=>{
    
    passport.authenticate('jwt',{session:false},(err,user,info)=>{
    if(!user){
        return next( new ForBiddenError('User Not Found..SignUp Please'))
    }
    const {password,...rest}=user._doc
    res.status(StatusCodes.OK).json(rest)
    })(req,res,next)
}
export {updateUserController}