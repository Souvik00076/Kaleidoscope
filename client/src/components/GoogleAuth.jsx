import { Button } from 'flowbite-react'
import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import {GoogleAuthProvider,signInWithPopup,getAuth} from 'firebase/auth'
import app from '../firebase';
import { useSelector,useDispatch } from 'react-redux';
import { signInSuccess,signInFailure } from '../redux/user/UserSlice';
import axios from 'axios'
import { ROUTES } from '../constants';
import { useNavigate } from 'react-router-dom';
const GoogleAuth = () => {
  const {currentUser,loading,error}=useSelector(state=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()


  const handleAuth=async(e)=>{
    const auth=getAuth(app)
    const provider=new GoogleAuthProvider()
    provider.setCustomParameters({prompt:'select_account'})
    try{
            const resultsFromGoogle=await signInWithPopup(auth,provider)
            const data=resultsFromGoogle.user;
  
            const res=await axios({
              headers:{
                'Content-Type':'application/json'
              },
              method: 'post',
              url: ROUTES.OAUTH_SIGN_IN,
              data: JSON.stringify(data),
            })
            if(res.data.success===true){
            dispatch(signInSuccess(res.data))
            navigate('/',{replace:true})
          }
    }catch(err){
        dispatch(signInFailure(err))
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
