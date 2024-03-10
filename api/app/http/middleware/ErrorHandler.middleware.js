import { StatusCodes } from "http-status-codes";
const ErrorHandler=(err,req,res,next)=>{
    if(err){
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    }
    if(err.name==='ValidationError'){
        console.log("Called here in error handler")
        customError.msg = Object.values(err.errors)
          .map((item) => item.message)
          .join(',')
    }
    return res.status(customError.statusCode).json({success:false, msg: customError.msg })
    }
    next()
}

export default ErrorHandler