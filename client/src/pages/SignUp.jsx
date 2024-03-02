import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const SignUp = () => {
  const [formData,setFormData]=useState({})

  const onHandleChange=(e)=>{
    
    setFormData({...formData,[e.target.id]:e.target.value})
    console.log(formData)
  }

  const onEnterPressed=(e)=>{
    if (e.key === "Enter"){
      onFormSubmit()
    }
  }

  const onFormSubmit=(e)=>{
      e.preventDefault()

      if(!formData.email || !formData.username || !formData.password){
        //show error 
        return 
      }
      //use try catch to fetch data.
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
      
      <div className='flex-1' onSubmit={onFormSubmit}>
        <form>
          <div >
            <Label value='Username'/>
            <TextInput 
            id='username'
            placeholder='john1234'
            required
            onChange={onHandleChange}
            onKeyUp={onEnterPressed}
          />
          </div>
          
          <div className='mt-[20px]'>
            <Label value='Email'/>
            <TextInput 
            id='email'
            placeholder='john1234@mail.com'
            required
            type='email'
            onChange={onHandleChange}
            onKeyUp={onEnterPressed}
            />
          </div>
        
          <div className='mt-[20px]'>
            <Label value='Password'/>
            <TextInput 
            id='password'
            placeholder='john1234@mail.com'
            required
            onChange={onHandleChange}
            onKeyUp={onEnterPressed}
            />
          </div>
          
          <div className='mt-[20px]'>
            <Label value='Confirm Password'/>
            <TextInput 
            id='conf-password'
            placeholder='john1234@mail.com'
            required
            onChange={onHandleChange}
            onKeyUp={onEnterPressed}
            />
          </div>
          <Button type='submit' gradientDuoTone="pinkToOrange"  className='w-[100%] mt-[20px]'>
            Sign Up
          </Button>
      </form>
      <div className='mt-[12px] mb-8'>
        <span>Have an account?</span>
        <Link to='/signin' className='text-blue-500'> Sign In</Link>
      </div>
      </div>
    </div>
  )
}
export default SignUp
