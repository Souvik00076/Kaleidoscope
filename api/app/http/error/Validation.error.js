import CustomApiError from "./CustomApi.error.js"
import { StatusCodes } from "http-status-codes"

class ValidationError extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode=StatusCodes.NO_CONTENT
    }
}

export default ValidationError