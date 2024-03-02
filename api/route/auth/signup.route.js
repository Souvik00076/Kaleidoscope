import express from 'express'
const Router=express.Router()

import { signUpUser } from '../../app/http/controller/signup.controller.js'

Router.route('/sign-up').post(signUpUser)

export default Router