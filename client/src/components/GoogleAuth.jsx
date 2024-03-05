import { Button } from 'flowbite-react'
import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import {GoogleAuthProvider,signInWithPopup,getAuth} from 'firebase/auth'
import app from '../firebase';
import { useSelector } from 'react-redux';
const GoogleAuth = () => {
  const {currentUser}=useSelector(state=>state.user)
  const handleAuth=async(e)=>{
    console.log("hello")
    e.preventDefault()
    const auth=getAuth(app)
    const provider=new GoogleAuthProvider()
    provider.setCustomParameters({prompt:'select_account'})
    try{
            const resultsFromGoogle=await signInWithPopup(auth,provider)
            
    }catch(err){
        console.log(err)
    }
  }
  return (
    <Button type='button'  outline gradientDuoTone='greenToBlue'
     className='w-[100%] mt-[20px]' onClick={handleAuth}>
        <GoogleIcon/>
        <span className='ml-4 font-bold'>  Conitnue With Google</span>
    </Button>
  )
}

export default GoogleAuth
