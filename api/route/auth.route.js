import express from 'express'
const Router=express.Router()

import { signUpUser,signInUser,authSignInUser } from '../app/http/controller/auth.controller.js'

Router.route('/signup').post(signUpUser)
Router.route('/signin').post(signInUser)
Router.route('/oauth/google/signin').post(authSignInUser)
export default Router