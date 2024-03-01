
import {ValidationError} from '../error/Error.index.js'
const signUpUser=(req,res)=>{
    const user={...req.body}
    
    res.send({message:"Signup successfull"})
}

export  {signUpUser}