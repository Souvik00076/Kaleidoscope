import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'
const DashboardProfile = () => {
    const {currentUser}=useSelector(state=>state.user)
    return (
    <div className='flex flex-col max-w-sm container mx-auto lg:mt-52'>
      <form className='flex flex-col'>
        <div className='h-32 w-32 self-center cursor-pointer shadow-lg rounded-full mb-8'>
        <img src={currentUser.data.photourl} alt="" className='rounded-full w-full h-full object-cover border-8 border-[lightgray] '/>
        </div>
        
        <TextInput value={currentUser.data.username} type='text' className='mb-4'/>
        <TextInput value={currentUser.data.email} type='email' className='mb-4'/>
        <TextInput placeholder='Password' type='password' className='mb-4'/>
        <Button gradientDuoTone='pinkToOrange' className='mb-4'>Update</Button>
      </form>
      <div className='flex flex-row justify-between text-red-500 font-semibold'> 
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
    </div>
    
   
  )
}

export default DashboardProfile
