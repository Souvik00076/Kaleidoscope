import express from 'express'
const Router=express.Router()
import { updateUserController } from '../app/http/controller/user.controller.js'
import authenticateWare from '../app/http/middleware/passport.auth.middleware.js'

Router.route('/update/:id').put(authenticateWare,updateUserController)


export default Router