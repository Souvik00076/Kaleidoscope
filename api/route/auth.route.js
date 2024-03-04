import express from 'express'
const Router=express.Router()

import { signUpUser,signInUser } from '../app/http/controller/auth.controller.js'

Router.route('/signup').post(signUpUser)
Router.route('/signin').post(signInUser)
export default Router