import { StatusCodes } from "http-status-codes"
import passport from 'passport'
import ForBiddenError from "../error/ForBidden.error.js"
const authenticate=(req,res,next)=>{
    passport.authenticate('jwt',{session:false},(err,user,info)=>{
        if(!user){
            return next( new ForBiddenError('User Not Found..SignUp Please'))
        }
        const {password,...rest}=user._doc
        res.success=StatusCodes.OK
        res.user=rest
        next()
        })(req,res,next)
}

export default authenticate