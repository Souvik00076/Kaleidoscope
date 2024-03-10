import { Button, TextInput,Alert,Spinner } from 'flowbite-react'
import {React,useState,useRef,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import app from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import axios from 'axios';
import { processStart,processFailure,updationSuccess } from '../redux/user/UserSlice';
import { HiInformationCircle } from 'react-icons/hi'

const DashboardProfile = () => {
    const {currentUser}=useSelector(state=>state.user)
    const [profileImageFile,setProfileImageFile]=useState(null)
    const [profileImageUrl,setProfileImageUrl]=useState(currentUser.data.url)
    const [formData,setFormData]=useState({
      username:currentUser.data.username,
      email:currentUser.data.email,
      password:null,
    })
    const dispatch=useDispatch()
    const [profileImageUploadProgress,setProfileImageUploadProgress]=useState(null)
    const [profileImageUploadError,setProfileImageUploadError]=useState(null)
    const {loading,error}=useSelector(state=>state.user)
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
          setProfileImageUploadProgress(null)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
            setProfileImageUrl(downloadUrl)
            setProfileImageUploadProgress(null)
            setProfileImageUploadError(null)
          })
        }
      )
      
    }

    const onHandleUpdate=async()=>{
      if(!formData.password){
        dispatch(processFailure(new Error("Password Cannot be empty")))
        return 
      }
      if(profileImageUploadError){ 
        dispatch(processFailure(new Error(profileImageUploadError)))
        return 
      }
      dispatch(processStart())
      try{
        console.log(currentUser.data._id)
        const res=await axios({
          headers:{
            'Content-Type':'application/json'
          },
          method: 'put',
          url:`/api/v1/user/update/${currentUser.data._id}`,
          data: JSON.stringify(formData),
        })
        dispatch( updationSuccess(res.data))
      }catch(err){
        dispatch(processFailure(err))
      }
     
    }

    const onFormDataChange=(e)=>{
      setFormData({...formData,[e.target.id]:e.target.value})
    }

  
    return (
    <div className='flex flex-col max-w-sm container mx-auto lg:mt-52'>
      <form className='flex flex-col' onChange={onFormDataChange}>
      <input 
        type='file' 
        accept='image/*' 
        onClick={onProfileImageChange}
        hidden
        ref={profileImagePickerRef}
        />

        <div className='relative h-32 w-32 self-center cursor-pointer shadow-lg rounded-full mb-8'>
        {
          profileImageUploadProgress &&
          (
            <CircularProgressbar value={profileImageUploadProgress || 0} 
              text={`${profileImageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root:{
                  width:'100%',
                  height:'100%',
                  position:'absolute',
                  top:0,
                  left:0,
                },
                path: {
                  stroke:`rgba(62,152,199),${profileImageUploadProgress/100}`
                }
              }}
           />
          )
        }
        <img 
        src={profileImageUrl || currentUser.data.photourl} 
        alt="" 
        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]
        ${profileImageUploadProgress && profileImageUploadProgress<100 && 'opacity-60'}
        `}

        onClick={()=>profileImagePickerRef.current.click()}
        />
        </div>
        <TextInput id='username' defaultValue={formData.username}  type='text' className='mb-4'/>
        <TextInput id='email' type='email' defaultValue={formData.email} className='mb-4'/>
     
        <TextInput id='password' placeholder='New Password' type='password' className='mb-4'/>
        <Button gradientDuoTone='pinkToOrange' className='mb-4' onClick={onHandleUpdate}>
        {
            loading ? (
            <>
                <Spinner aria-label="Spinner button example" size="sm" />
                <span className="pl-3">Loading...</span>
            </>
            ): 'Update'
          }
        </Button>
      </form>
      <div className='flex flex-row justify-between text-red-500 font-semibold'> 
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
     
    </div>
  )
}

export default DashboardProfile
