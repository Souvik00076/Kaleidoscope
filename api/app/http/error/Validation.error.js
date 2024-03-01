import CustomApiError from "./CustomApi.error.js"
import { StatusCodes } from "http-status-codes"

class ValidationError extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode=StatusCodes.BAD_REQUEST
    }
}

export default ValidationError