
import { StatusCodes } from 'http-status-codes'
import {ValidationError,NotFoundError,ForBiddenError} from '../error/Error.index.js'
import User from '../model/user.model.js'
import jwt from 'jsonwebtoken'

const signUpUser=async (req,res)=>{
    const data={...req.body}
    if(!data.username || !data.email || !data.password){
        throw new ValidationError('Name, Email and Password are required')
    }
    const user=await User.create(data)
    const {password,...rest}=user._doc
    res.status(StatusCodes.CREATED).json({success:true,rest})
}


const signInUser=async (req,res)=>{
    const credInfo={...req.body}
    if(!credInfo.email || !credInfo.password){
        throw new ValidationError('Email and Password are required')
    }
    const user=await User.findOne({email:credInfo.email})
    if(!user){
        throw new NotFoundError('No account exist with this email.')
    }
    const isMatched= await user.match(credInfo.password)
    if(!isMatched){
        throw new ForBiddenError('Invalid password')
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    const {password,...rest}=user._doc
    res.
    status(StatusCodes.OK).
    cookie('access_token',token,{
        httpOnly:true,
        expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
    }).
    json({success:true,data:rest})
}
const authSignInUser=async (req,res)=>{
    const {email,displayName:username,photoURL:photourl}=req.body
    console.log(email," ",username," ",photourl)
    let user=await User.findOne({email:email})
    if(!user){
        const password=email+username+Math.random()*100
        user=await User.create({username,email,password,photourl})
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    const {password,...rest}=user._doc
    res.
    status(StatusCodes.OK).
    cookie('access_token',token,{
        httpOnly:true,
        expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
    }).
    json({success:true,data:rest})
}
export  {signUpUser,signInUser,authSignInUser}