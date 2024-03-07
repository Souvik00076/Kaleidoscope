import React from 'react'
import {Avatar, Button, Dropdown, Navbar, TextInput} from 'flowbite-react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useLocation } from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';
import { toggle } from '../redux/theme/ThemeSlice';
const Header = () => {
  const location=useLocation()
  const {currentUser}=useSelector(state=>state.user)
  const {theme_style}=useSelector(state=>state.theme)
  const dispatch=useDispatch()
  const onHandleThemeMode=()=>{
      //useDispatch(toggle())
      dispatch(toggle())
  }
  return (
    <Navbar className='border-b-2'>
       <Link to="/" className=' self-center no-underline text-sm lg:text-xl text-white'>
        <span className=' bg-gradient-to-r from-orange-400 via-red-500 to-pink-500
                         px-6 py-2 rounded-lg'>
        Kaliedoscope
        </span>
       </Link>


      <form>
        <TextInput 
          id='search-input' 
          placeholder='Search..' 
          rightIcon={SearchIcon}
          className='hidden lg:inline'
          />
      </form>
      
      
      <Button className='h-10 w-12 lg:hidden' color='gray' pill>
        <SearchIcon/>
      </Button>
      
      
      <div className='flex flex-row flex-row gap-2 items-center md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline-flex' pill color='gray'  onClick={onHandleThemeMode}>
          {
            theme_style==='light'?<LightModeIcon/>
            : <ModeNightIcon />
          }    
        </Button>
        {
            currentUser?(
              <Dropdown
              arrowIcon={false}
                inline
                label={
                  <Avatar img={currentUser.data.photourl} rounded />
                }
              >
              <Dropdown.Header className='flex flex-col'>
                {currentUser.data.username}
                <span className='text-gray-400'>{currentUser.data.email}</span> 
                </Dropdown.Header>
              <Dropdown.Item>
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                Sign Out
              </Dropdown.Item>

              </Dropdown>
            ):(     
            <Link to='/signin'>
              <Button outline gradientDuoTone="pinkToOrange">SignIn</Button>
            </Link>
            )
        }
        
       
      </div>
      
      
     
    
    </Navbar>
  )
}

export default Header
