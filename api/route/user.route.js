import express from 'express'
const Router=express.Router()
import { updateUserController } from '../app/http/controller/user.controller.js'


Router.route('/update/:id').put(updateUserController)


export default Router