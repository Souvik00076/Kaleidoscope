import { StatusCodes } from "http-status-codes"
import CustomApiError from "./CustomApi.error.js"

class ForBiddenError extends CustomApiError{
    constructor(message){
        super(message)
        this.StatusCode= StatusCodes.FORBIDDEN
    }
}
export default ForBiddenError