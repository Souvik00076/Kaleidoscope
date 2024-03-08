import { StatusCodes } from "http-status-codes"

const updateUserController=(req,res)=>{
    res.status(StatusCodes.OK).json({message:'hello  world'})
}

export {updateUserController}