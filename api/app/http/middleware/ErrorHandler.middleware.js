import { StatusCodes } from "http-status-codes";

const ErrorHandler=(err,req,res,next)=>{
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    }

    if(err.name==='ValidationError'){
        customError.msg = Object.values(err.errors)
          .map((item) => item.message)
          .join(',')
    }

    return res.status(customError.statusCode).json({ msg: customError.msg })
}

export default ErrorHandler