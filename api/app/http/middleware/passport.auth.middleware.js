import { StatusCodes } from "http-status-codes"
import passport from 'passport'
import ForBiddenError from "../error/ForBidden.error.js"
const authenticate=(req,res,next)=>{
    passport.authenticate('jwt',{session:false},(err,user)=>{
    
        if(!user){
            return next( new ForBiddenError('User Not Found..SignUp Please'))
        }
        if(err){
            return next(err)
        }        
        const {password,...rest}=user._doc
        if(req.params.id!=rest._id){
            return next(new ForBiddenError('User Not Found'))
        }
        req.user=rest
        next()
        })(req,res,next)
}

export default authenticate