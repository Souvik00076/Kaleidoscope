import { Button, TextInput } from 'flowbite-react'
import {React,useState,useRef,useEffect} from 'react'
import { useSelector } from 'react-redux'
import CameraIcon from '@mui/icons-material/Camera';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import app from '../firebase';

const DashboardProfile = () => {
    const {currentUser}=useSelector(state=>state.user)
    const [profileImageFile,setProfileImageFile]=useState(null)
    const [profileImageUrl,setProfileImageUrl]=useState(null)
    const [profileImageUploadProgress,setProfileImageUploadProgress]=useState(0)
    const [profileImageUploadError,setProfileImageUploadError]=useState(null)
    const profileImagePickerRef=useRef()

    const onProfileImageChange=(e)=>{
      const file=e.target.files[0]
      if(file){
        setProfileImageFile(file)
        setProfileImageUrl(URL.createObjectURL(file))
      }
    }

    useEffect(()=>{
        if(profileImageFile)
        uploadImage(profileImageFile)
    },[profileImageFile])

    const uploadImage=async(imageFile)=>{
      const storage=getStorage(app)
      const fileName=new Date()+imageFile.name
      const storageRef=ref(storage,fileName)
      const uploadTask=uploadBytesResumable(storageRef,imageFile)

      uploadTask.on(
        'state_changed',
        (snapshot)=>{
          const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
          setProfileImageUploadProgress(progress.toFixed(0))
        },
        (error)=>{
          setProfileImageUploadError('Could Not upload image. Image file size must be less than 1MB')
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
            setProfileImageUrl(downloadUrl)
          })
        }
      )
    }

    return (
    <div className='flex flex-col max-w-sm container mx-auto lg:mt-52'>
      <form className='flex flex-col'>
      <input 
        type='file' 
        accept='image/*' 
        onClick={onProfileImageChange}
        hidden
        ref={profileImagePickerRef}
        />

        <div className='h-32 w-32 self-center cursor-pointer shadow-lg rounded-full mb-8'>
        <img 
        src={profileImageUrl || currentUser.data.photourl} 
        alt="" 
        className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
        onClick={()=>profileImagePickerRef.current.click()}
        />
       {/*  <CameraIcon className='left-0 right-0'/> */}
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
