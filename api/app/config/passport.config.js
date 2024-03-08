import passport from 'passport'
import { Strategy as JWTStrategy,ExtractJwt } from 'passport-jwt'

const jwtSecret='secret'

const jwtStrategy=new JWTStrategy({
    jwtFromRequest:ExtractJwt.fromExtractors([
        (req)=>req.cookies?.access_token,
    ]),
    secretOrKey:jwtSecret,
    },
    (jwtPayload,done)=>{
        console.log(jwtPayload)
    }
)
passport.use(jwtStrategy)
export default passport