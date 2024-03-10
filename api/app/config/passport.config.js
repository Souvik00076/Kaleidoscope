import passport from 'passport'
import { Strategy as JWTStrategy,ExtractJwt } from 'passport-jwt'
import User from '../http/model/user.model.js'
const jwtSecret='secret'

const jwtStrategy=new JWTStrategy({
    jwtFromRequest:ExtractJwt.fromExtractors([
        (req)=>req.cookies?.access_token,
    ]),
    secretOrKey:jwtSecret,
    },
    async(jwtPayload,done)=>{
         const {id,iat}=jwtPayload
         try{
         const user=await User.findById({_id:id})
            if(user){
                return  done(null,user)     
            }
        }catch(error){
            done(error,false)
        }   
    }
)
passport.use(jwtStrategy)
export default passport