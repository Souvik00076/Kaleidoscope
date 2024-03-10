import { StatusCodes } from "http-status-codes"
const notFoundHandler=(req,res)=>{
    res.status(StatusCodes.BAD_REQUEST).send({msg:'Route Does Not Exist'})
}
export default notFoundHandler