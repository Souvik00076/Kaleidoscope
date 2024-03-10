import React from 'react'
import { Button, Label, TextInput, Alert,Spinner } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi'
import { MESSAGES,ROUTES } from '../constants.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {processStart,signInSuccess,processFailure} from '../redux/user/UserSlice'
import {  useDispatch,useSelector } from 'react-redux'
import GoogleAuth from '../components/GoogleAuth'

const SignIn = () => {
  const [formData,setFormData]=useState({})
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {loading,error}=useSelector((state)=>state.user)
  const onHandleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const onEnterPressed=(e)=>{
    if (e.key === "Enter"){
      onFormSubmit()
    }
  }
  const onFormSubmit=async(e)=>{
      e && e.preventDefault()
      if(!formData.email || !formData.password){
        dispatch(processFailure(MESSAGES.field_empty_error))
        return 
      }
      dispatch(processStart())
      try{
        const res=await axios({
          headers:{
            'Content-Type':'application/json'
          },
          method: 'post',
          url: ROUTES.SIGNIN,
          data: JSON.stringify(formData),
        })
        const data=res.data
        if(data.success===true) {
          dispatch(signInSuccess(data))
         navigate('/',{replace:true})
          
          }
        else dispatch(processFailure(data.msg))

    }catch(err){
      dispatch(processFailure(err.message))
    }
  }
  return (
    <div className='mt-[10rem] flex flex-col gap-12 lg:flex-row items-center w-[90%] lg:w-[70%]  container mx-auto'>
      <div className='flex-1'>  
      <Link to="/" className='no-underline text-4xl text-white'>
        <span className=' bg-gradient-to-r from-orange-400 via-red-500 to-pink-500
                         px-6 py-2 rounded-lg'>
        Kaliedoscope
        </span>
       </Link>
      </div>
      
      <div className='flex-1' onSubmit={onFormSubmit} onChange={onHandleChange}
            onKeyUp={onEnterPressed}>
        <form>
          
          <div className='mt-[20px]'>
            <Label value='Email'/>
            <TextInput 
            id='email'
            placeholder='john1234@mail.com'
            required
            type='email'
           
            />
          </div>
        
          <div className='mt-[20px]'>
            <Label value='Password'/>
            <TextInput 
            id='password'
            placeholder='john1234@mail.com'
            required
           
            />
          </div>


          <Button type='submit' gradientDuoTone="pinkToOrange"  className='w-[100%] mt-[20px]'>
          {
            loading ? (
            <>
                <Spinner aria-label="Spinner button example" size="sm" />
              <span className="pl-3">Loading...</span>
            </>
            ): 'Sign Up'
          }
          </Button>
      </form>
      <GoogleAuth/>
      <div className='mt-[12px]'>
        <span>Don't Have an account?</span>
        <Link to='/signup' className='text-blue-500'> Sign Up</Link>
      </div>
      {
      error && (
      <div className='mt-4 mb-8'>
      <Alert color="failure" icon={HiInformationCircle}>
        {error}
      </Alert>
      </div>
      )}
     
      </div>
      
    </div>
  )
}

export default SignIn
