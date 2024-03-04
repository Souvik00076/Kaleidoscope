import { Button, Label, TextInput, Alert,Spinner } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi'
import { MESSAGES, ROUTES } from '../constants'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const [formData,setFormData]=useState({})
  const [errorMessage,setErrorMessage]=useState(null)
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
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

      if(!formData.email || !formData.password || !formData.username){
        setErrorMessage(MESSAGES.field_empty_error)
        return 
      }
      if(formData.password!=formData.conf_password){
        setErrorMessage(MESSAGES.password_mismatch)
        return 
      }
      setLoading(true)
      try{
        const res=await axios({
          headers:{
            'Content-Type':'application/json'
          },
          method: 'post',
          url: ROUTES.SIGNUP,
          data: JSON.stringify(formData),
        })
        const data=res.data
        if(data.success===true) {
          setErrorMessage(null)
          navigate('/signin',{replace:true})
        }
          else setErrorMessage(res.msg)
    }catch(err){
      setErrorMessage(err.message)
    }
    setLoading(false)
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
          <div>
            <Label value='Username'/>
            <TextInput 
            id='username'
            placeholder='john1234'
            required 
          />
          </div>
          
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
          
          <div className='mt-[20px]'>
            <Label value='Confirm Password'/>
            <TextInput 
            id='conf_password'
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
      <div className='mt-[12px]'>
        <span>Have an account?</span>
        <Link to='/signin' className='text-blue-500'> Sign In</Link>
      </div>
      {
      errorMessage && (
      <div className='mt-4 mb-8'>
      <Alert color="failure" icon={HiInformationCircle}>
        {errorMessage}
      </Alert>
      </div>
      )}
      </div>
      
    </div>
  )
}
export default SignUp
