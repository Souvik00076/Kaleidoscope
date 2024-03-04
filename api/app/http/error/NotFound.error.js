import CustomApiError from "./CustomApi.error.js"
import { StatusCodes } from "http-status-codes"


class NotFoundError extends CustomApiError{
    constructor(message){
        super(message)
        this.StatusCode=StatusCodes.NOT_FOUND
    }
}

export default NotFoundError